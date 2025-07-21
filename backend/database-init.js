import sqlite3 from "sqlite3";
import bcrypt from "bcryptjs";

const db = new sqlite3.Database("./database.sqlite");

const adminEmail = "admin@transmora.id";
const adminPassword = "admin123";
const adminName = "Admin Transmora";
const adminRole = "admin";
const hashedPassword = bcrypt.hashSync(adminPassword, 10);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user'
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price INTEGER NOT NULL,
    image TEXT,
    location TEXT,
    category TEXT,
    user_id INTEGER,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);

  // Seed admin user jika belum ada
  db.get("SELECT * FROM users WHERE email = ?", [adminEmail], (err, row) => {
    if (!row) {
      db.run(
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
        [adminName, adminEmail, hashedPassword, adminRole],
        (err) => {
          if (err) {
            console.error("Gagal membuat user admin:", err.message);
          } else {
            console.log("User admin default berhasil dibuat.");
          }
          db.close();
          console.log("Database initialized.");
        }
      );
    } else {
      console.log("User admin sudah ada.");
      db.close();
      console.log("Database initialized.");
    }
  });
});
