"use client"
import { addToCart, removeFromCart } from '@/app/redux/CartSlice';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from "react-icons/fa";


const MenuCard = ({data=[],loading}) => {

    const dispatch = useDispatch();
    const{items,totalQuantity,totalPrice} =useSelector((state)=>state.cart)
    console.log(items,totalQuantity,totalPrice);
      const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
    const [quantity, setQuantity] = useState(0);

  const handleLike = () => setLiked(!liked);
  const handleSave = () => setSaved(!saved);


    const handleAddToCart= ()=>{
      dispatch(addToCart(data));
      setQuantity((prev) => prev + 1);
      toast.success("Added to Cart");
    }

    const handleremoveFromcart = ()=>{
      dispatch(removeFromCart);
      if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    } else {
      setQuantity(0);
     
    }
      toast.success("Decreased Item from cart")
    }

  return (
   <div className="py-5 px-4 flex w-full border rounded-sm border-gray-200 justify-between items-start gap-6 bg-white shadow-sm hover:shadow-md transition">
      {/* Left side - Info */}
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <img src="/veg-icon.png" alt="veg" className="h-4 w-4" />
          <h1 className="text-lg font-semibold text-gray-900">{data?.name}</h1>
        </div>
        <h2 className="text-md font-medium text-gray-800">₹{data?.price}</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          {data?.description}
        </p>

        {/* Action Icons */}
        <div className="flex items-center gap-4 pt-2">
          <button onClick={handleLike} className="text-red-500 text-lg">
            {liked ? <FaHeart /> : <FaRegHeart />}
          </button>
          <button onClick={handleSave} className="text-yellow-600 text-lg">
            {saved ? <FaBookmark /> : <FaRegBookmark />}
          </button>
        </div>
      </div>

      {/* Right side - Image + Button */}
      <div className="flex flex-col items-center gap-3">
        <img
          src={data?.image_path}
          alt="Paneer Tikka"
          className="object-cover w-[180px] h-[120px] rounded-xl shadow-sm"
        />
        {/* <button
          onClick={handleAddToCart}
          className="bg-green-500 w-[120px] py-1.5 text-sm font-medium text-white rounded-lg shadow hover:bg-green-600 transition"
        >
          Add
        </button> */}
        <div className="flex items-center justify-between bg-green-500 w-[120px] py-1.5 px-3 rounded-lg shadow">
            <button
              onClick={handleremoveFromcart}
              className="text-white font-bold text-lg px-2"
            >
              –
            </button>
            <span className="text-white font-semibold">{quantity}</span>
            <button
              onClick={handleAddToCart}
              className="text-white font-bold text-lg px-2"
            >
              +
            </button>
          </div>
      </div>
    </div>

  )
}

export default MenuCard
