import React from 'react'

const FoodImagesection = ({data=[] }) => {
  
  return (
    <div className='md:grid md:grid-cols-5 gap-2 rounded-sm '>
        
        {data.length > 0 ? <>
        {
            data?.map((item,index)=><div key={index}>
            <img className='w-[200px] h-[200px] object-cover' src={item}/>
        </div>)
        }
        
        </>:<>
        <div className='w-[100%] h-[0vh] justify-center items-center'>
            <h1>No Photos Found</h1>
        </div>
        </> }
    </div>
  )
}

export default FoodImagesection
