import { useState } from "react";
import { toast } from "react-toastify";
import LoadingSpinner from "./_ui/LoadingSpinner.js";
import FoodItemCard from "./_ui/FoodItemCard.js";

const AddFoodItem = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image_path, setImage_path] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(false);
  const [loading,setLoading]=useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    if (!name || !price || !image_path || !description) {
      setError(true);
      setLoading(false);
      return;
    }
    const restaurantUser= JSON.parse(localStorage.getItem('RestaurantUser'));
    let restaurant_id ;
    if(restaurantUser){
      restaurant_id=restaurantUser._id;
    }
    try {
      let response = await fetch(`http://localhost:3000/api/restaurant/foods`, {method:"POST", body:JSON.stringify({name,price,image_path,description, restaurant_id})})
      response =await response.json();
      if(response.success){
        toast.success("Added")
      }else{
        toast.error("Food Item Not Added")
      }
    } catch (error) {
      toast?.error("Internal Server Error ")
      setLoading(false);
      return;
    }finally{
      setError(false);
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-2">
      <div>
{/* Form */}
<div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">Add New Food Item</h1>

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
          onClick={handleSubmit}
          className="w-full mt-4 py-3 px-6 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md transition duration-200"
        >
          {loading ? <><div className="flex gap-2 items-center justify-center"><LoadingSpinner size={8} color="white"/><span>Adding Dish </span></div></> :"Add Dish"}
        </button>
      </div>
    </div>
      </div>
      <div>
        <FoodItemCard/>
      </div>
    </div>
  );
};

export default AddFoodItem;


// const PreviewCard= ()=>{
//   return(
//     <>
//     <div>
//       Preview Card Goes herer
//     </div>
//     </>
//   )
// }