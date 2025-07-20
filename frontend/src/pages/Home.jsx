import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Product from "../components/Product";
import Input from "../components/Input";
import Button from "../components/Button";
import { House, Truck, Computer, Camera, Search } from "lucide-react";

const CATEGORIES = [
  { id: "all", name: "All Categories", icon: <House /> },
  { id: "logistics", name: "Logistics & Transporter", icon: <Truck /> },
  { id: "tech", name: "Tech & Measurement", icon: <Computer /> },
  { id: "media", name: "Media & Promotion", icon: <Camera /> },
];

const FILTERS = [
  { id: "all", name: "All" },
  { id: "price-low", name: "Price: Low to High" },
  { id: "price-high", name: "Price: High to Low" },
  { id: "rating", name: "Highest Rated" },
  { id: "location", name: "By Location" },
];

function getCatalogData() {
  // Prefer localStorage data if available
  const saved = localStorage.getItem("catalogItems");
  if (saved) {
    return JSON.parse(saved);
  }
  // Fallback sample data
  return [
    // Logistics
    {
      id: 1,
      name: "Express Delivery Service",
      description: "Fast and reliable delivery across Indonesia",
      price: "50000",
      rating: 4.8,
      icon: "Truck",
      location: "Jakarta",
      category: "logistics",
    },
    {
      id: 2,
      name: "Heavy Cargo Transport",
      description: "Specialized transport for heavy machinery",
      price: "500000",
      rating: 4.6,
      icon: "Package",
      location: "Surabaya",
      category: "logistics",
    },
    {
      id: 3,
      name: "Cold Chain Logistics",
      description: "Temperature-controlled transportation",
      price: "150000",
      rating: 4.9,
      icon: "Snowflake",
      location: "Bandung",
      category: "logistics",
    },
    // Tech
    {
      id: 4,
      name: "Digital Scale System",
      description: "Precision weighing and measurement",
      price: "2500000",
      rating: 4.7,
      icon: "Scale",
      location: "Jakarta",
      category: "tech",
    },
    {
      id: 5,
      name: "GPS Tracking Device",
      description: "Real-time vehicle tracking system",
      price: "1200000",
      rating: 4.5,
      icon: "MapPin",
      location: "Semarang",
      category: "tech",
    },
    {
      id: 6,
      name: "IoT Temperature Monitor",
      description: "Smart temperature monitoring",
      price: "800000",
      rating: 4.8,
      icon: "Thermometer",
      location: "Yogyakarta",
      category: "tech",
    },
    // Media
    {
      id: 7,
      name: "Digital Marketing Package",
      description: "Complete social media management",
      price: "3000000",
      rating: 4.9,
      icon: "Smartphone",
      location: "Jakarta",
      category: "media",
    },
    {
      id: 8,
      name: "Video Production Service",
      description: "Professional video content creation",
      price: "5000000",
      rating: 4.7,
      icon: "Video",
      location: "Bandung",
      category: "media",
    },
    {
      id: 9,
      name: "Brand Promotion Campaign",
      description: "Comprehensive brand awareness",
      price: "8000000",
      rating: 4.8,
      icon: "Target",
      location: "Surabaya",
      category: "media",
    },
  ];
}

function formatPrice(price) {
  if (typeof price === "string" && price.includes("Rp")) return price;
  return `Rp ${parseInt(price).toLocaleString()}`;
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [catalog, setCatalog] = useState([]);
  // const navigate = useNavigate(); // Removed as per edit hint

  useEffect(() => {
    setCatalog(getCatalogData());
  }, []);

  function getFilteredItems() {
    let items = [...catalog];
    if (selectedCategory !== "all") {
      items = items.filter((item) => item.category === selectedCategory);
    }
    if (searchTerm) {
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    switch (selectedFilter) {
      case "price-low":
        items.sort((a, b) => parseInt(a.price) - parseInt(b.price));
        break;
      case "price-high":
        items.sort((a, b) => parseInt(b.price) - parseInt(a.price));
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
  }

  const filteredItems = getFilteredItems();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-500 to-blue-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h1 className="text-4xl font-bold mb-4">
              Find Your Perfect Service Partner
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Discover reliable logistics, cutting-edge technology, and creative
              media solutions
            </p>
            <div className="max-w-2xl mx-auto">
              <Input
                type="text"
                placeholder="Search for services, companies, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={
                  <svg
                    className="w-5 h-5"
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
                }
                className="bg-white text-gray-800"
              />
            </div>
          </div>
        </section>

        {/* Category and Filter Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Categories */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Browse Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {CATEGORIES.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "primary" : "outline"
                  }
                  className="flex flex-col items-center p-4"
                  onClick={() => setSelectedCategory(category.id)}
                  fullWidth
                >
                  <span className="text-2xl mb-2">{category.icon}</span>
                  <span className="text-sm font-medium">{category.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <span className="text-gray-700 font-medium">Filter by:</span>
            {FILTERS.map((filter) => (
              <Button
                key={filter.id}
                variant={selectedFilter === filter.id ? "primary" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter.id)}
              >
                {filter.name}
              </Button>
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
              <Product
                key={item.id}
                product={{ ...item, price: formatPrice(item.price) }}
              />
            ))}
          </div>

          {/* No Results */}
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4 flex justify-center">
                <Search size={100} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No results found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search terms or filters
              </p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
