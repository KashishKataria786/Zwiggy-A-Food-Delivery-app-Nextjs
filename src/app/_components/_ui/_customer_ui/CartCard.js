import React from 'react'

const CartCard = ({data=[]}) => {
  return (
    <div className={`py-6 border-b  flex justify-between items-center gap-5 border-gray-200 bg-white mt-2 px-4  rounded-sm`}>
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
            {/* <button onClick={()=>dispatch(addToCart(data))} className='bg-green-500 w-full px-2 py-1 text-white font-medium rounded-sm hover:bg-green-700'>Add to Cart</button> */}
          <div>
            <button>+</button>
            <button>-</button>
          </div>
          </div>
        </div>
  )
}

export default CartCard
