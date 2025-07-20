import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AdminAdd from "../components/AdminAdd";
import AdminEdit from "../components/AdminEdit";
import Input from "../components/Input";
import Button from "../components/Button";
import { Package, Truck, Computer, Camera, Search } from "lucide-react";
const CATEGORIES = [
  { id: "logistics", name: "Logistics & Transporter" },
  { id: "tech", name: "Tech & Measurement" },
  { id: "media", name: "Media & Promotion" },
];

function formatPrice(price) {
  if (typeof price === "string" && price.includes("Rp")) return price;
  return `Rp ${parseInt(price).toLocaleString()}`;
}

export default function Admin() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    category: "logistics",
    location: "",
    icon: "Truck",
  });

  useEffect(() => {
    const saved = localStorage.getItem("catalogItems");
    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);

  const saveItems = (newItems) => {
    setItems(newItems);
    localStorage.setItem("catalogItems", JSON.stringify(newItems));
  };

  const addItem = () => {
    const item = {
      id: Date.now(),
      ...newItem,
      rating: 4.5,
    };
    saveItems([...items, item]);
    setNewItem({
      name: "",
      description: "",
      price: "",
      category: "logistics",
      location: "",
      image: "",
    });
    setShowAddModal(false);
  };

  const editItem = () => {
    if (!editingItem) return;
    const updatedItems = items.map((item) =>
      item.id === editingItem.id ? editingItem : item
    );
    saveItems(updatedItems);
    setEditingItem(null);
    setShowEditModal(false);
  };

  const deleteItem = (id) => {
    if (window.confirm("Delete this item?")) {
      saveItems(items.filter((item) => item.id !== id));
    }
  };

  const openEditModal = (item) => {
    setEditingItem({ ...item });
    setShowEditModal(true);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">Manage catalog items</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={<Package />}
              label="Total Items"
              value={items.length}
              color="blue"
            />
            <StatCard
              icon={<Truck />}
              label="Logistics"
              value={
                items.filter((item) => item.category === "logistics").length
              }
              color="green"
            />
            <StatCard
              icon={<Computer />}
              label="Tech"
              value={items.filter((item) => item.category === "tech").length}
              color="purple"
            />
            <StatCard
              icon={<Camera />}
              label="Media"
              value={items.filter((item) => item.category === "media").length}
              color="pink"
            />
          </div>

          {/* Controls */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <Input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search size={18} />}
                className="bg-white"
              />
              <Button
                onClick={() => setShowAddModal(true)}
                variant="primary"
                className="px-6 py-2"
              >
                + Add New Item
              </Button>
            </div>
          </div>

          {/* Items Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Item
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Location
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 mr-3"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {item.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {
                          CATEGORIES.find((cat) => cat.id === item.category)
                            ?.name
                        }
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {formatPrice(item.price)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.location}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <Button
                        variant="outline"
                        size="sm"
                        className="mr-2"
                        onClick={() => openEditModal(item)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => deleteItem(item.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <div className=" mb-4 flex items-center justify-center">
                  <Package size={48} />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No items found
                </h3>
                <p className="text-gray-500">
                  Try adding some items or adjusting your search
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <AdminAdd
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        formData={newItem}
        setFormData={setNewItem}
        onSubmit={addItem}
        categories={CATEGORIES}
      />
      <AdminEdit
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        editingItem={editingItem}
        setEditingItem={setEditingItem}
        onSubmit={editItem}
        categories={CATEGORIES}
      />
      <Footer />
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  const colorMap = {
    blue: "bg-blue-100",
    green: "bg-green-100",
    purple: "bg-purple-100",
    pink: "bg-pink-100",
  };
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`p-2 rounded-lg ${colorMap[color] || "bg-gray-100"}`}>
          <span className="text-2xl">{icon}</span>
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  );
}
