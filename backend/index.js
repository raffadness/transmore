import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware
app.use(cors());
app.use(express.json({ limit: "2mb" }));

// Middleware autentikasi JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function requireAdmin(req, res, next) {
  if (req.user.role !== "admin") return res.sendStatus(403);
  next();
}

// Setup SQLite database
const db = new sqlite3.Database("./database.sqlite", (err) => {
  if (err) {
    console.error("Failed to connect to database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

// Root endpoint
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Register endpoint
app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  db.run(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashedPassword],
    function (err) {
      if (err) {
        if (err.message.includes("UNIQUE")) {
          return res.status(400).json({ message: "Email already registered" });
        }
        return res.status(500).json({ message: "Database error" });
      }
      res.json({ id: this.lastID, name, email, role: "user" });
    }
  );
});

// Login endpoint
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }
  db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  });
});

// GET all products (with user name)
app.get("/api/products", (req, res) => {
  db.all(
    `SELECT products.*, users.name as user_name FROM products LEFT JOIN users ON products.user_id = users.id`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ message: "Database error" });
      res.json(rows);
    }
  );
});

// GET product by id (with user name)
app.get("/api/products/:id", (req, res) => {
  db.get(
    `SELECT products.*, users.name as user_name FROM products LEFT JOIN users ON products.user_id = users.id WHERE products.id = ?`,
    [req.params.id],
    (err, row) => {
      if (err) return res.status(500).json({ message: "Database error" });
      if (!row) return res.status(404).json({ message: "Product not found" });
      res.json(row);
    }
  );
});

// CREATE product (admin only)
app.post("/api/products", authenticateToken, requireAdmin, (req, res) => {
  const { name, description, price, image, location, category } = req.body;
  if (!name || !price || !category) {
    return res
      .status(400)
      .json({ message: "Name, price, and category required" });
  }
  db.run(
    "INSERT INTO products (name, description, price, image, location, category, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [name, description, price, image, location, category, req.user.id],
    function (err) {
      if (err) return res.status(500).json({ message: "Database error" });
      res.json({
        id: this.lastID,
        name,
        description,
        price,
        image,
        location,
        category,
        user_id: req.user.id,
      });
    }
  );
});

// UPDATE product (admin only)
app.put("/api/products/:id", authenticateToken, requireAdmin, (req, res) => {
  const { name, description, price, image, location, category } = req.body;
  db.run(
    "UPDATE products SET name=?, description=?, price=?, image=?, location=?, category=? WHERE id=?",
    [name, description, price, image, location, category, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ message: "Database error" });
      if (this.changes === 0)
        return res.status(404).json({ message: "Product not found" });
      res.json({
        id: req.params.id,
        name,
        description,
        price,
        image,
        location,
        category,
      });
    }
  );
});

// DELETE product (admin only)
app.delete("/api/products/:id", authenticateToken, requireAdmin, (req, res) => {
  db.run("DELETE FROM products WHERE id=?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ message: "Database error" });
    if (this.changes === 0)
      return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  });
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
