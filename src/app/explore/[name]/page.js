"use client"
import CustomerLayout from '@/app/_components/_layout/CustomerLayout'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import FoodImagesection from '@/app/_components/_ui/_customer_ui/FoodImagesection'
import MenuCard from '@/app/_components/_ui/_customer_ui/MenuCard'

const RestaurantDetailPage = (props) => {
  const [restaurantDetails, setRestaurantDetails] = useState({})
  const [menu, setMenu] = useState([])
  const [foodImages, setFoodImages] = useState([])
  const [photosOpen,setPhotosOpen]=useState(false);
  const [loading,setLoading] = useState(true);
  
  const searchParams = useSearchParams()
  const id = searchParams.get("id")   
  const name = props.params.name
  

  const loadRestaurantDetails = async () => {
    if (!id) return
    setLoading(true);
    try {
      let response = await fetch(`http://localhost:3000/api/customer/${id}`)
      response = await response.json()

      setRestaurantDetails(response.result)
      setMenu(response.menu || [])
      setFoodImages(response.foodImages || [])

      console.log("API Response:", response)
    } catch (error) {
      console.error("Error fetching restaurant details:", error)
      setLoading(false);
    } finally{
        setLoading(false);
    }
  }

 

  useEffect(() => {
    loadRestaurantDetails()
  }, [id])  

  return (
    <CustomerLayout>
      <div className="w-[60vw] mx-auto px-1 py-9">
        <h1 className="text-4xl font-semibold">{decodeURI(name)}</h1>

        {restaurantDetails?.restaurantName && (
          <div className="mt-4">
            <p className=" text-gray-700 text-sm">{`${restaurantDetails.address}`}</p>
            <p className=" text-gray-600 text-sm">{restaurantDetails.city}</p>
            
          </div>
        )}
       
        <div className='space-x-10 my-5'>
            <button className={`py-4 px-6 border-b-4 text-xl font-semibold border-b-gray-200 ${!photosOpen ? "border-b-orange-400":"text-gray-600"}`} onClick={()=>setPhotosOpen(false)}>Menu </button>
            <button className={`py-4 px-6 border-b-4 text-xl font-semibold border-b-gray-200 ${photosOpen ? "border-b-orange-400":"text-gray-600"}`}   onClick={()=> setPhotosOpen(true)}>Food Images</button>
            <hr className=' border-gray-300 rounded-full'/>
        </div>
        {
            photosOpen? <FoodImagesection data={foodImages}/>:
            <div>
                <div>
                    Menu
                    </div>
            {/* <h1>{`${menu.length}  items in Menu`}</h1>   */}
             <div>
             {loading? <>
             {[1,2,3,4,5].map((item)=><div className='h-[200px] w-full my-2 bg-gray-200 animate-pulse'>
                </div>)}
             </>:menu.length>0&&menu.map((item,index)=><MenuCard key={index} data={item}  />)}
            </div>
            </div>
        }
      </div>
    </CustomerLayout>
  )
}

export default RestaurantDetailPage
