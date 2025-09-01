'use client';

import { useState } from "react";
import { toast } from "react-toastify";
import LoadingSpinner from "./_ui/LoadingSpinner.js";
import FoodItemCard from "./_ui/FoodItemCard.js";
import { useRouter } from "next/navigation.js";

const AddFoodItem = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image_path, setImage_path] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!name || !price || !image_path || !description) {
      setError(true);
      setLoading(false);
      return;
    }
    const restaurantUser = JSON.parse(localStorage.getItem('RestaurantUser'));
    let restaurant_id;
    if (restaurantUser) {
      restaurant_id = restaurantUser._id;
    }

    try {
      let response = await fetch(`http://localhost:3000/api/restaurant/foods`, {
        method: "POST",
        body: JSON.stringify({ name, price, image_path, description, restaurant_id }),
      });
      response = await response.json();
      if (response.success) {
        toast.success("Food item added successfully!");
        // Reset fields
        setName('');
        setPrice('');
        setImage_path('');
        setDescription('');
      } else {
        toast.error("Failed to add food item.");
      }
    } catch (error) {
      toast.error("Internal server error.");
    } finally {
      setError(false);
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-8 bg-gray-50 min-h-screen">
      {/* Form Section */}
      <div className="w-full max-w-xl mx-auto p-6 bg-white rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Add New Food Item</h1>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dish Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Paneer Butter Masala"
              className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {error && !name && <span className="text-xs text-red-500">Name is required</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (in ₹)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g. 250"
              className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {error && !price && <span className="text-xs text-red-500">Price is required</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="text"
              value={image_path}
              onChange={(e) => setImage_path(e.target.value)}
              placeholder="https://example.com/dish.jpg"
              className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {error && !image_path && <span className="text-xs text-red-500">Image URL is required</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a short description..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {error && !description && <span className="text-xs text-red-500">Description is required</span>}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition duration-200"
          >
            {loading ? (
              <div className="flex gap-2 items-center justify-center">
                <LoadingSpinner size={8} color="white" />
                <span>Adding Dish...</span>
              </div>
            ) : (
              "Add Dish"
            )}
          </button>
        </div>
      </div>

      {/* Preview Section */}
      <div className="w-full flex flex-col items-center justify-start ">
        <h2 className="text-2xl font-bold text-gray-800 ">Preview</h2>
        <FoodItemCard
          name={name}
          price={price}
          image={image_path}
          description={description}
        />
      </div>
    </div>
  );
};

export default AddFoodItem;
