import { useState, useEffect } from "react";
import Header from "../components/Header";
import AdminAdd from "../components/AdminAdd";
import AdminEdit from "../components/AdminEdit";

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
    image: "🚚",
  });

  const categories = [
    { id: "logistics", name: "Logistics & Transporter" },
    { id: "tech", name: "Tech & Measurement" },
    { id: "media", name: "Media & Promotion" },
  ];

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
      image: "🚚",
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
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600">Manage catalog items</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-2xl">📦</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-800">
                  {items.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-2xl">🚚</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Logistics</p>
                <p className="text-2xl font-bold text-gray-800">
                  {items.filter((item) => item.category === "logistics").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <span className="text-2xl">⚙️</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Tech</p>
                <p className="text-2xl font-bold text-gray-800">
                  {items.filter((item) => item.category === "tech").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-pink-100 rounded-lg">
                <span className="text-2xl">📱</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Media</p>
                <p className="text-2xl font-bold text-gray-800">
                  {items.filter((item) => item.category === "media").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <span className="text-gray-400">🔍</span>
              </div>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
            >
              + Add New Item
            </button>
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
                      <div className="text-2xl mr-3">{item.image}</div>
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
                      {categories.find((cat) => cat.id === item.category)?.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    Rp {parseInt(item.price).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {item.location}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <button
                      onClick={() => openEditModal(item)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📦</div>
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

      {/* AdminAdd Component */}
      <AdminAdd
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        formData={newItem}
        setFormData={setNewItem}
        onSubmit={addItem}
        categories={categories}
      />

      {/* AdminEdit Component */}
      <AdminEdit
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        editingItem={editingItem}
        setEditingItem={setEditingItem}
        onSubmit={editItem}
        categories={categories}
      />
    </div>
  );
}
