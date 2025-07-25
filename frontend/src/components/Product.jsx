import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";

const Product = ({
  product,
  showLocation = true,
  showCategory = false,
  className = "",
  onClick,
  ...props
}) => {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    if (typeof price === "string" && price.includes("Rp")) {
      return price;
    }
    return `Rp ${parseInt(price).toLocaleString()}`;
  };

  const getCategoryName = (categoryId) => {
    const categories = {
      logistics: "Logistics & Transporter",
      tech: "Tech & Measurement",
      media: "Media & Promotion",
    };
    return categories[categoryId] || categoryId;
  };

  const getCategoryColor = (categoryId) => {
    const colors = {
      logistics: "bg-green-100 text-green-800",
      tech: "bg-purple-100 text-purple-800",
      media: "bg-pink-100 text-pink-800",
    };
    return colors[categoryId] || "bg-gray-100 text-gray-800";
  };

  const handleClick = () => {
    if (onClick) {
      onClick(product);
    } else {
      navigate(`/DetailProduct/${product.id}`);
    }
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-100 transform hover:scale-105 ${className}`}
      onClick={handleClick}
      {...props}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <img
            className="w-32 h-32 aspect-square object-cover"
            src={product.image}
            alt={product.name}
          />
        </div>
        {showCategory && (
          <div className="mb-3">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(
                product.category
              )}`}
            >
              {getCategoryName(product.category)}
            </span>
          </div>
        )}

        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-blue-500">
            {formatPrice(product.price)}
          </span>
          {showLocation && (
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <MapPin size={16} /> {product.location}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
