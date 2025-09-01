import { useRouter } from 'next/navigation'
import React from 'react'

const EmptyCart = () => {
    const router= useRouter();
  return (
    <div className='h-[70vh] space-y-10 py-auto flex flex-col justify-center items-center'>

        <div>
            <img className='w-[300px] h-auto' src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0'/>
        </div>
      <div className='space-y-3 text-center'>
        <h1 className='font-semibold '>Your Cart is Empty</h1>
      <h2 className='text-sm'>You can go to home page to view more restaurants</h2>
      <button onClick={()=>router.push('/')} className='py-2 hover:bg-amber-800 px-6 bg-amber-500 text-xl font-bold text-white'>See Restaurants Near you</button>
        </div>
    </div>
  )
}

export default EmptyCart
