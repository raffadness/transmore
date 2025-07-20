import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function DetailProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    // Get product data from localStorage
    const savedItems = localStorage.getItem("catalogItems");
    if (savedItems) {
      const items = JSON.parse(savedItems);
      const foundProduct = items.find((item) => item.id === parseInt(id));

      if (foundProduct) {
        setProduct(foundProduct);

        // Get related products (same category, exclude current product)
        const related = items
          .filter(
            (item) =>
              item.category === foundProduct.category &&
              item.id !== foundProduct.id
          )
          .slice(0, 3);
        setRelatedProducts(related);
      } else {
        // Product not found, redirect to home
        navigate("/");
      }
    } else {
      // No data available, redirect to home
      navigate("/");
    }
  }, [id, navigate]);

  const handleContactSubmit = (e) => {
    e.preventDefault();

    // Simulate sending contact form
    alert("Thank you for your inquiry! We'll get back to you soon.");
    setContactForm({ name: "", email: "", phone: "", message: "" });
    setIsContactModalOpen(false);
  };

  const formatPrice = (price) => {
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

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="text-6xl mb-4">⏳</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Loading...
            </h2>
            <p className="text-gray-600">
              Please wait while we load the product details
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <a href="/" className="hover:text-blue-600">
                Home
              </a>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>
              <a href="/" className="hover:text-blue-600">
                Catalog
              </a>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-800 font-medium">{product.name}</li>
          </ol>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image & Info */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="text-8xl mb-4">{product.image}</div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="flex items-center">
                  <span className="text-yellow-400 text-xl">★</span>
                  <span className="ml-1 text-gray-600">{product.rating}</span>
                </div>
                <span className="text-gray-400">•</span>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(
                    product.category
                  )}`}
                >
                  {getCategoryName(product.category)}
                </span>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>

              <div className="flex items-center space-x-2">
                <span className="text-gray-500">📍</span>
                <span className="text-gray-700">{product.location}</span>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-blue-600">
                  {formatPrice(product.price)}
                </span>
                <span className="text-sm text-gray-500">Starting Price</span>
              </div>

              <button
                onClick={() => setIsContactModalOpen(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
              >
                Contact Provider
              </button>
            </div>
          </div>

          {/* Product Features & Details */}
          <div className="space-y-6">
            {/* Key Features */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Key Features
              </h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">
                    Professional service delivery
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Quality guaranteed</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">24/7 customer support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">
                    Flexible pricing options
                  </span>
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Service Details
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Category</span>
                  <p className="font-medium text-gray-800">
                    {getCategoryName(product.category)}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Location</span>
                  <p className="font-medium text-gray-800">
                    {product.location}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Rating</span>
                  <p className="font-medium text-gray-800">
                    {product.rating}/5.0
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Price Range</span>
                  <p className="font-medium text-gray-800">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </div>
            </div>

            {/* Provider Info */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                About Provider
              </h2>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {product.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">{product.name}</h3>
                  <p className="text-sm text-gray-500">Verified Provider</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                Professional service provider with years of experience in{" "}
                {getCategoryName(product.category).toLowerCase()}. Committed to
                delivering high-quality services to meet your business needs.
              </p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Related Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/product/${item.id}`)}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-100"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-3xl">{item.image}</div>
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm text-gray-600">
                          {item.rating}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {item.name}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-blue-600">
                        {formatPrice(item.price)}
                      </span>
                      <span className="text-sm text-gray-500">
                        📍 {item.location}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Contact Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Contact Provider</h2>
            <p className="text-gray-600 mb-4">
              Send a message to inquire about "{product.name}"
            </p>

            <form onSubmit={handleContactSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        message: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    placeholder="Tell us about your requirements..."
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsContactModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
