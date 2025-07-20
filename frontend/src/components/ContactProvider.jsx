import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";

const ContactProvider = ({
  open,
  onClose,
  productName = "",
  onSubmit: onSubmitProp,
}) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [error, setError] = useState("");

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Please fill all required fields.");
      return;
    }
    if (onSubmitProp) {
      onSubmitProp(form);
    } else {
      alert("Thank you for your inquiry! We'll get back to you soon.");
    }
    setForm({ name: "", email: "", phone: "", message: "" });
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-xl font-bold mb-4">Contact Provider</h2>
        <p className="text-gray-600 mb-4">
          Send a message to inquire about{" "}
          <span className="font-semibold">{productName}</span>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              label="Your Name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
            />
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                placeholder="Tell us about your requirements..."
                required
              />
            </div>
            {error && (
              <p className="text-red-500 text-xs text-center">{error}</p>
            )}
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactProvider;
