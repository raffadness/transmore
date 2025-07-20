import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const navigate = useNavigate();

  // Sample data for catalog items
  const catalogData = {
    logistics: [
      {
        id: 1,
        name: "Express Delivery Service",
        description: "Fast and reliable delivery across Indonesia",
        price: "Rp 50.000",
        rating: 4.8,
        image: "🚚",
        location: "Jakarta",
        category: "logistics",
      },
      {
        id: 2,
        name: "Heavy Cargo Transport",
        description: "Specialized transport for heavy machinery",
        price: "Rp 500.000",
        rating: 4.6,
        image: "📦",
        location: "Surabaya",
        category: "logistics",
      },
      {
        id: 3,
        name: "Cold Chain Logistics",
        description: "Temperature-controlled transportation",
        price: "Rp 150.000",
        rating: 4.9,
        image: "❄️",
        location: "Bandung",
        category: "logistics",
      },
    ],
    tech: [
      {
        id: 4,
        name: "Digital Scale System",
        description: "Precision weighing and measurement",
        price: "Rp 2.500.000",
        rating: 4.7,
        image: "⚖️",
        location: "Jakarta",
        category: "tech",
      },
      {
        id: 5,
        name: "GPS Tracking Device",
        description: "Real-time vehicle tracking system",
        price: "Rp 1.200.000",
        rating: 4.5,
        image: "📍",
        location: "Semarang",
        category: "tech",
      },
      {
        id: 6,
        name: "IoT Temperature Monitor",
        description: "Smart temperature monitoring",
        price: "Rp 800.000",
        rating: 4.8,
        image: "🌡️",
        location: "Yogyakarta",
        category: "tech",
      },
    ],
    media: [
      {
        id: 7,
        name: "Digital Marketing Package",
        description: "Complete social media management",
        price: "Rp 3.000.000",
        rating: 4.9,
        image: "📱",
        location: "Jakarta",
        category: "media",
      },
      {
        id: 8,
        name: "Video Production Service",
        description: "Professional video content creation",
        price: "Rp 5.000.000",
        rating: 4.7,
        image: "🎥",
        location: "Bandung",
        category: "media",
      },
      {
        id: 9,
        name: "Brand Promotion Campaign",
        description: "Comprehensive brand awareness",
        price: "Rp 8.000.000",
        rating: 4.8,
        image: "🎯",
        location: "Surabaya",
        category: "media",
      },
    ],
  };

  const categories = [
    { id: "all", name: "All Categories", icon: "🏠" },
    { id: "logistics", name: "Logistics & Transporter", icon: "🚚" },
    { id: "tech", name: "Tech & Measurement", icon: "⚙️" },
    { id: "media", name: "Media & Promotion", icon: "📱" },
  ];

  const filters = [
    { id: "all", name: "All" },
    { id: "price-low", name: "Price: Low to High" },
    { id: "price-high", name: "Price: High to Low" },
    { id: "rating", name: "Highest Rated" },
    { id: "location", name: "By Location" },
  ];

  // Get filtered and sorted items
  const getFilteredItems = () => {
    let items = [];

    if (selectedCategory === "all") {
      items = [
        ...catalogData.logistics,
        ...catalogData.tech,
        ...catalogData.media,
      ];
    } else {
      items = catalogData[selectedCategory] || [];
    }

    // Search filter
    if (searchTerm) {
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort filter
    switch (selectedFilter) {
      case "price-low":
        items.sort(
          (a, b) =>
            parseInt(a.price.replace(/\D/g, "")) -
            parseInt(b.price.replace(/\D/g, ""))
        );
        break;
      case "price-high":
        items.sort(
          (a, b) =>
            parseInt(b.price.replace(/\D/g, "")) -
            parseInt(a.price.replace(/\D/g, ""))
        );
        break;
      case "rating":
        items.sort((a, b) => b.rating - a.rating);
        break;
      case "location":
        items.sort((a, b) => a.location.localeCompare(b.location));
        break;
      default:
        break;
    }

    return items;
  };

  const handleItemClick = (item) => {
    // Navigate to item detail page
    navigate(`/item/${item.id}`, { state: { item } });
  };

  const filteredItems = getFilteredItems();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              Find Your Perfect Service Partner
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Discover reliable logistics, cutting-edge technology, and creative
              media solutions
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for services, companies, or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 pr-4 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Browse Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50"
                }`}
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <div className="text-sm font-medium">{category.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <span className="text-gray-700 font-medium">Filter by:</span>
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedFilter === filter.id
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredItems.length}{" "}
            {filteredItems.length === 1 ? "result" : "results"}
          </p>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-100 transform hover:scale-105"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">{item.image}</div>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm text-gray-600">{item.rating}</span>
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
                    {item.price}
                  </span>
                  <span className="text-sm text-gray-500">
                    📍 {item.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No results found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
