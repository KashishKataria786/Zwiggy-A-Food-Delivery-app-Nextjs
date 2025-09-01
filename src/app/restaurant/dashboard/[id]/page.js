"use client"
import React , { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../_components/_ui/LoadingSpinner.js";
import FoodItemCard from "../../../_components/_ui/FoodItemCard.js";
import { useRouter } from "next/navigation.js";
import DashboardLayout from "@/app/_components/_layout/DashboardLayout.js";

const EditFoodItemPage = (props) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image_path, setImage_path] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(false);
  const [loading,setLoading]=useState(false);
  const params =React.use(props.params)
  const router = useRouter();

  useEffect(()=>{
handleLoadFoodItem();
  },[])

  const handleLoadFoodItem =async()=>{
    let response = await fetch("http://localhost:3000/api/restaurant/foods/edit/"+params.id);
    response= await response.json();
    if(response?.success){
      console.log(response.result);
      setName(response.result?.name);
      setPrice(response.result.price);
      setImage_path(response.result?.image_path);
      setDescription(response.result?.description);
    }
  }

 const handleEditSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  if (!name || !price || !image_path || !description) {
    setError(true);
    setLoading(false);
    return;
  }

  try {
    let response = await fetch(
      `http://localhost:3000/api/restaurant/foods/edit/${params.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price,
          image_path,
          description,
        }),
      }
    );

    response = await response.json();

    if (response.success) {
      toast.success("Item Updated Successfully!")
      router.push('../dashboard/');
    } else {
      toast.error(response.message || "Failed to update data");
    }
  } catch (error) {
    console.error("Error updating data:", error);
    alert("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <DashboardLayout>
    <div className="grid grid-cols-2">
      <div>
{/* Form */}
<div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">Update Food Item</h1>

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm text-gray-700 mb-1">
            Dish Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Paneer Butter Masala"
            className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {error && !name && <span className="text-[12px] text-red-500">Name is required</span>}
        </div>

        <div>
          <label htmlFor="price" className="block text-sm text-gray-700 mb-1">
            Price (in ₹)
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="e.g. 250"
            className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {error && !price && <span className="text-[12px] text-red-500">Price is required</span>}
        </div>

        <div>
          <label htmlFor="image" className="block text-sm text-gray-700 mb-1">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            value={image_path}
            onChange={(e) => setImage_path(e.target.value)}
            placeholder="e.g. https://example.com/dish.jpg"
            className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {error && !image_path && <span className="text-[12px] text-red-500">Image URL is required</span>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a short description..."
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {error && !description && <span className="text-[12px] text-red-500">Description is required</span>}
        </div>

        <button
          onClick={handleEditSubmit}
          className="w-full mt-4 py-3 px-6 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md transition duration-200"
        >
          {loading ? <><div className="flex gap-2 items-center justify-center"><LoadingSpinner size={8} color="white"/><span>Updating Dish </span></div></> :"Update Dish"}
        </button>
        
      </div>
    </div>
      </div>
      <div className=""><h1 className="text-2xl font-semibold">Preview</h1>
        <div className="flex justify-center items-center">
          
        <FoodItemCard name={name} price={price} image={image_path} description={description}/>
        </div>
      </div>
    </div></DashboardLayout>
  );
};

export default EditFoodItemPage ;
