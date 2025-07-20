import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    // Demo login logic
    if (email === "admin@example.com" && password === "admin123") {
      localStorage.setItem("user", JSON.stringify({ email, role: "admin" }));
      navigate("/dashboard");
    } else if (email === "user@example.com" && password === "user123") {
      localStorage.setItem("user", JSON.stringify({ email, role: "user" }));
      navigate("/dashboard");
    } else {
      setError("Invalid credentials. Please use the demo credentials below.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border-0">
          <div className="p-8">
            <div className="text-center space-y-2 mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
              <p className="text-gray-600 text-sm">
                Sign in to your account to continue
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              <Button type="submit" fullWidth className="mt-2">
                Sign In
              </Button>
            </form>
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="text-blue-500 hover:text-blue-700 font-medium"
                >
                  Sign up
                </a>
              </p>
            </div>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-700 font-medium mb-1">
                Demo Credentials:
              </p>
              <p className="text-xs text-gray-600">
                Admin: admin@example.com / admin123
              </p>
              <p className="text-xs text-gray-600">
                User: user@example.com / user123
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
