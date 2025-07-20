import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Name is required";
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = "Email is invalid";
  if (!form.password) errors.password = "Password is required";
  else if (form.password.length < 6)
    errors.password = "Password must be at least 6 characters";
  if (!form.confirmPassword)
    errors.confirmPassword = "Please confirm your password";
  else if (form.password !== form.confirmPassword)
    errors.confirmPassword = "Passwords do not match";
  return errors;
}

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
    setSubmitError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate(form);
    setErrors(newErrors);
    setSubmitError("");
    if (Object.keys(newErrors).length > 0) return;
    // Demo registration logic
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    if (existingUsers.find((user) => user.email === form.email)) {
      setSubmitError("Email already registered. Please use a different email.");
      return;
    }
    const newUser = {
      id: Date.now(),
      name: form.name,
      email: form.email,
      password: form.password,
      role: "user",
    };
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));
    localStorage.setItem(
      "user",
      JSON.stringify({ email: newUser.email, role: newUser.role })
    );
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border-0">
          <div className="p-8">
            <div className="text-center space-y-2 mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Create Account
              </h2>
              <p className="text-gray-600 text-sm">Sign up to get started</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Full Name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                error={errors.name}
                required
              />
              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                error={errors.email}
                required
              />
              <Input
                label="Password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                error={errors.password}
                required
              />
              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                required
              />
              {submitError && (
                <p className="text-red-500 text-sm text-center">
                  {submitError}
                </p>
              )}
              <Button type="submit" fullWidth className="mt-2">
                Create Account
              </Button>
            </form>
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Sign in
                </a>
              </p>
            </div>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-700 font-medium mb-1">
                Registration Info:
              </p>
              <p className="text-xs text-gray-600">
                • Password must be at least 6 characters
              </p>
              <p className="text-xs text-gray-600">
                • You'll be automatically logged in after registration
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
