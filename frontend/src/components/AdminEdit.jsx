import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";

const AdminEdit = ({
  isOpen,
  onClose,
  editingItem,
  setEditingItem,
  onSubmit,
  categories,
}) => {
  const [imageError, setImageError] = useState("");
  if (!isOpen || !editingItem) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2048 * 1024) {
      setImageError("File size must be less than 2MB");
      return;
    }
    setImageError("");
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditingItem({ ...editingItem, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-xl font-bold mb-4">Edit Item</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div className="space-y-4">
            <Input
              label="Name"
              type="text"
              value={editingItem.name}
              onChange={(e) =>
                setEditingItem({ ...editingItem, name: e.target.value })
              }
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={editingItem.description}
                onChange={(e) =>
                  setEditingItem({
                    ...editingItem,
                    description: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                required
              />
            </div>

            <Input
              label="Price (IDR)"
              type="number"
              value={editingItem.price}
              onChange={(e) =>
                setEditingItem({ ...editingItem, price: e.target.value })
              }
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={editingItem.category}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, category: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Location"
              type="text"
              value={editingItem.location}
              onChange={(e) =>
                setEditingItem({ ...editingItem, location: e.target.value })
              }
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image (max 2MB)
              </label>
              <Input
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                onChange={handleImageChange}
                className="w-full"
              />
              {imageError && (
                <p className="text-red-500 text-xs mt-1">{imageError}</p>
              )}
              {editingItem.image && (
                <img
                  src={editingItem.image}
                  alt="Preview"
                  className="mt-2 rounded-lg border h-24 object-contain"
                />
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEdit;
