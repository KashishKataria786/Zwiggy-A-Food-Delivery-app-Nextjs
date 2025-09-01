"use client"
import CustomerLayout from '@/app/_components/_layout/CustomerLayout'
import BillReceipt from '@/app/_components/_ui/_customer_ui/BillReciepts'
import CartCard from '@/app/_components/_ui/_customer_ui/CartCard'
import EmptyCart from '@/app/_components/_ui/_customer_ui/EmptyCart'
import { clearCart } from '@/app/redux/CartSlice'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'


const CartPage = () => {
  const { items } = useSelector((state) => state.cart) 
  const dispatch = useDispatch()

  return (
    <CustomerLayout>
      <div className='bg-gray-100 py-10'>
        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className='grid grid-cols-3 md:w-[70vw] mx-auto gap-5'>
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
              {items?.map((item, index) => (
                <CartCard key={index} data={item} />
              ))}
            </div>
            <div>
              <BillReceipt />
            </div>
          </div>
        )}
      </div>
    </CustomerLayout>
  )
}

export default CartPage
