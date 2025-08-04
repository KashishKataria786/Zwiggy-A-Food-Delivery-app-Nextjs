'use client';
import React, { useEffect, useState } from 'react';
import LoadingSpinner from './_ui/LoadingSpinner.js';
import FoodItemCard from './_ui/FoodItemCard';

const FoodItemList = () => {    
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const FetchFoodItems = async (setFoodItems, setError, setLoading) => {
    setLoading(true);
  try {
    const storedUser = localStorage.getItem('RestaurantUser');
    if (!storedUser) {
      setError('User not found in localStorage');
      return;
    }

    const user = JSON.parse(storedUser);
    const restaurantId = user._id;
    console.log(restaurantId)

    const response = await fetch(`http://localhost:3000/api/restaurant/foods/${restaurantId}`);
    console.log(response)
    const data = await response.json();

    setFoodItems(data.result);
  } catch (error) {
    console.error('Error fetching food items:', error);
    setError(error.message || 'Something went wrong');
  } finally {
    setLoading(false);
  }
};

const DeleteFoodItem= async()=>{
  try {
    const storedUser = localStorage.getItem('RestaurantUser');
    if (!storedUser) {
      setError('User not found in localStorage');
      return;
    }

    const user = JSON.parse(storedUser);
    const restaurantId = user._id;
    console.log(restaurantId);

    const deletedItem = await fetch('http://localhost:3000/api/restaurant/foods/')
  } catch (error) {
    
  }
}

useEffect(() => {
  FetchFoodItems(setFoodItems, setError, setLoading);
}, []);

  if (loading) return <LoadingSpinner size={16} />;
  if (error) return <div className="text-red-500 p-4">⚠️ {error}</div>;

  return (
    <div className="max-w-8xl p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📋 Food Menu</h1>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full table-auto">
          <thead className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 text-left">#</th>
              <th className="px-6 py-4 text-left">Item</th>
              <th className="px-6 py-4 text-left">Price</th>
              <th className="px-6 py-4 text-left">Image</th>
              <th className="px-6 py-4 text-left">Description</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {foodItems.map((item, index) => (
              <tr
                key={item._id || index}
                className="hover:bg-orange-50 transition duration-150 ease-in-out"
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-700">
                  {index + 1}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                  {item.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">₹{item.price}</td>
                <td className="px-6 py-4">
                  <img
                    src={item.image_path || 'https://via.placeholder.com/40'}
                    alt={item.name}
                    className="w-8 h-8 object-cover rounded-full border shadow-sm"
                  />
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {item.description}
                </td>
                <td className="px-6 py-4 space-x-2">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-4 py-2 rounded-md transition">
                    Edit
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-2 rounded-md transition">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FoodItemList;
