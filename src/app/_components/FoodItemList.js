"use client";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "./_ui/LoadingSpinner.js";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation.js";

const FoodItemList = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const FetchFoodItems = async () => {
    setLoading(true);
    setError(""); 
    try {
      const storedUser = localStorage.getItem("RestaurantUser");
      if (!storedUser) {
        setError("User not found in localStorage");
        setLoading(false);
        return;
      }

      const user = JSON.parse(storedUser);
      const restaurantId = user._id;

      const response = await fetch(
        `http://localhost:3000/api/restaurant/foods/${restaurantId}`
      );
      const data = await response.json();

      if (!data?.success) {
        setError(data.message || "Failed to load food items");
      } else {
        setFoodItems(data.result || []);
        console.log("Fetched:", data.result);
      }
    } catch (error) {
      console.error("Error fetching food items:", error);
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const DeleteFoodItem = async (id) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/restaurant/foods/${id}`,
        { method: "DELETE" }
      );
      const result = await response.json();

      if (result.deletedCount > 0) {
        toast.success("Item deleted");
        setFoodItems((prev) => prev.filter((item) => item._id !== id));
      } else {
        toast.error(result.message || "Unable to delete food item");
      }
    } catch (error) {
      console.error(error);
      toast.error("Internal server error");
    }
  };

  useEffect(() => {
    FetchFoodItems();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📋 Food Menu</h1>

      {error && <div className="text-red-500 p-4">⚠️ {error}</div>}

      <div className="overflow-x-auto rounded-xl shadow-sm bg-white relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-10">
            <LoadingSpinner size={50} />
          </div>
        )}
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="text-left py-4 px-6">#</th>
              <th className="text-left py-4 px-6">Item</th>
              <th className="text-left py-4 px-6">Price</th>
              <th className="text-left py-4 px-6">Image</th>
              <th className="text-left py-4 px-6">Description</th>
              <th className="text-left py-4 px-6">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {foodItems.length > 0 ? (
              foodItems.map((item, index) => (
                <tr
                  key={item._id}
                  className="group hover:bg-orange-50 transition duration-300 ease-in-out"
                >
                  <td className="px-6 py-4 font-medium text-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-800">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-gray-700">₹{item.price}</td>
                  <td className="px-6 py-4">
                    <img
                      src={item.image_path || "https://via.placeholder.com/40"}
                      alt={item.name}
                      className="w-10 h-10 object-cover rounded-full border"
                    />
                  </td>
                  <td className="px-6 py-4 text-gray-600 max-w-[250px] truncate">
                    {item.description}
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      className="px-4 py-1.5 text-xs text-white bg-blue-500 rounded hover:bg-blue-600 transition"
                      onClick={() =>
                        router.push("/restaurant/dashboard/" + item._id)
                      }
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => DeleteFoodItem(item._id)}
                      className="px-4 py-1.5 text-xs text-white bg-red-500 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              !loading && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-6 text-center text-gray-500"
                  >
                    No food items found 🍽️
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FoodItemList;
