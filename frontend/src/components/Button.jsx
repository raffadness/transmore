import React from "react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  type = "button",
  className = "",
  icon = null,
  ...props
}) => {
  // Variant classes
  const variantClasses = {
    primary: "bg-blue-500 hover:bg-blue-700 text-white border-blue-500",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white border-gray-600",
    outline: "bg-transparent hover:bg-gray-50 text-gray-700 border-gray-300",
    danger: "bg-red-600 hover:bg-red-700 text-white border-red-600",
    success: "bg-green-600 hover:bg-green-700 text-white border-green-600",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700 border-transparent",
  };

  // Size classes
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg",
  };

  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-lg border transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";
  const variantClass = variantClasses[variant] || variantClasses.primary;
  const sizeClass = sizeClasses[size] || sizeClasses.md;
  const widthClass = fullWidth ? "w-full" : "";
  const disabledClass =
    disabled || loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClass} ${sizeClass} ${widthClass} ${disabledClass} ${className}`}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}

      {icon && !loading && <span className="mr-2">{icon}</span>}

      {children}
    </button>
  );
};

export default Button;
