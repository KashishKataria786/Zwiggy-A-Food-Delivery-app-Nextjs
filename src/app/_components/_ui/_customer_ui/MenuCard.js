"use client"
import { addToCart } from '@/app/redux/CartSlice';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const MenuCard = ({data=[],loading}) => {

    const dispatch = useDispatch();
    const{items,totalQuantity,totalPrice} =useSelector((state)=>state.cart)
    console.log(items,totalQuantity,totalPrice);
    
    const handleAddToCart= ()=>{
      dispatch(addToCart(data));
      toast.success("Added to Cart");
    }

  return (
   <div className="py-6 flex justify-between items-start gap-6 transition">
  {/* Left side - Info */}
  <div className="flex-1 space-y-2">
    <div className="flex items-center gap-2">
      <img
        src="/veg-icon.png"
        alt="veg/non-veg"
        className="h-4 w-4"
      />
      <h1 className="text-lg font-semibold text-gray-900">{data?.name}</h1>
    </div>
    <h2 className="text-md font-medium text-gray-800">₹{data?.price}</h2>
    <p className="text-sm text-gray-600 leading-relaxed">
      {data?.description}
    </p>
  </div>

  {/* Right side - Image + Button */}
  <div className="flex flex-col items-center gap-3">
    <img
      src={data?.image_path}
      alt={data?.name}
      className="object-cover w-[180px] h-[120px] rounded-xl shadow-sm"
    />
    <button
      onClick={handleAddToCart}
      className="bg-green-500 w-[120px] py-1.5 text-sm font-medium text-white rounded-lg shadow hover:bg-green-600 transition"
    >
      Add
    </button>
  </div>
</div>

  )
}

export default MenuCard
