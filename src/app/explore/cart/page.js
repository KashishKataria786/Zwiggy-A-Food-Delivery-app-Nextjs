"use client"
import CustomerLayout from '@/app/_components/_layout/CustomerLayout'
import BillReceipt from '@/app/_components/_ui/_customer_ui/BillReciepts'
import CartCard from '@/app/_components/_ui/_customer_ui/CartCard'
import EmptyCart from '@/app/_components/_ui/_customer_ui/EmptyCart'
import MenuCard from '@/app/_components/_ui/_customer_ui/MenuCard'
import UserDataInCart from '@/app/_components/_ui/_customer_ui/UserDataInCart'
import ProtectedRoute from '@/app/_wrappers/ProtectedRoute'
import { useAuth } from '@/app/context/AuthContext'
import { clearCart } from '@/app/redux/CartSlice'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


const CartPage = () => {
  // const { items } = useSelector((state) => state.cart); 
  const items=JSON.parse(localStorage.getItem('CartData')) || [];
  const {user, loggedIn} =useAuth();
  const dispatch = useDispatch();

 
  return (
    <CustomerLayout>

      
      <div className='bg-gray-100 py-10'>
        {items&&items.length === 0 ? (
          <EmptyCart />
        ) : (
          
          <div className='md:grid grid-cols-3 items-start md:w-[70vw] mx-auto gap-5 px-5 md:px-1'>
            <div className='grid col-span-2'>
              
              <div className='flex items-center justify-between'>
                <h1 className='text-3xl font-bold'>Your Cart</h1>
                <button
                  onClick={() => dispatch(clearCart())} 
                  className='px-4 py-2 text-white bg-red-400 font-semibold hover:bg-red-600'
                >
                  Empty Cart
                </button>
              </div>
              <div className='space-y-3'>
                {items?.map((item, index) => (
                <MenuCard key={index} data={item} />
              ))}
                </div>
            </div>
            <div>
               <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-1">🚚 Delivery Information</h2>
              <UserDataInCart/>
               <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-1">🚚 Bill </h2>

              <BillReceipt />
            </div>
          </div>
        )}
      </div>
    </CustomerLayout>
  )
}

export default CartPage
