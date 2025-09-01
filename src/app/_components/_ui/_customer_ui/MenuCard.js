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
    <div className={`py-6 border-b  flex justify-between items-center gap-5 border-gray-200`}>
      <div className='space-y-4'>
        <div className='space-y-1'>
        <div><img className='h-[18px] w-[18px]' src="/veg-icon.png"/></div>
        <h1 className='text-xl font-bold'>{data?.name}</h1>
        <h1 className='font-semibold'>{data?.price}</h1>
        </div>
        <p className='text-sm font-medium'>{data?.description}</p>
      </div>
      <div className='flex flex-col gap-2 justify-center items-center '>
        <img className='object-cover w-[250px] h-[150px]' src={data?.image_path}/>
        <button onClick={handleAddToCart} className='bg-green-500 w-full px-2 py-1 text-white font-medium rounded-sm hover:bg-green-700'>Add to Cart</button>
      </div>
    </div>
  )
}

export default MenuCard
