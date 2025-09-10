"use client"
import CustomerLayout from '@/app/_components/_layout/CustomerLayout'
import React, { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import FoodImagesection from '@/app/_components/_ui/_customer_ui/FoodImagesection'
import MenuCard from '@/app/_components/_ui/_customer_ui/MenuCard'
import { AuthContext, useAuth } from '@/app/context/AuthContext'

const RestaurantDetailPage = (props) => {
  const [restaurantDetails, setRestaurantDetails] = useState({})
  const [menu, setMenu] = useState([])
  const [foodImages, setFoodImages] = useState([])
  const [photosOpen,setPhotosOpen]=useState(false);
  const [loading,setLoading] = useState(true);

  const {user,loggedIn} = useContext(AuthContext);
  
  const searchParams = useSearchParams()
  const id = searchParams.get("id")   
  const name = searchParams.get("name");
  

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
  <div className="w-[65vw] mx-auto px-2 py-10">
    {/* Restaurant Header */}
    <div className=" pb-6">
      <h1 className="text-4xl font-bold text-gray-900">
        {restaurantDetails?.restaurantName}
      </h1>

      {!loading && restaurantDetails?.restaurantName && (
        <div className="mt-2 text-gray-600 text-base">
          <p>{restaurantDetails.address}</p>
          <p className="mt-1">{restaurantDetails.city}</p>
        </div>
      )}
    </div>

    {/* Tabs */}
    <div className="flex space-x-8 mt-6 border-b border-gray-200">
      <button
        onClick={() => setPhotosOpen(false)}
        className={`pb-3 text-lg font-semibold transition-colors ${
          !photosOpen
            ? "border-b-2 border-orange-500 text-orange-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        Menu
      </button>
      <button
        onClick={() => setPhotosOpen(true)}
        className={`pb-3 text-lg font-semibold transition-colors ${
          photosOpen
            ? "border-b-2 border-orange-500 text-orange-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        Food Images
      </button>
    </div>

    {/* Content */}
    <div className="mt-6">
      {photosOpen ? (
        <FoodImagesection data={foodImages} />
      ) : (
        <div>
          {!loading && (
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {menu.length} items in Menu
            </h2>
          )}

          {/* Menu List */}
          <div className="space-y-5 grid grid-cols-2 gap-3">
            {loading ? (
              [1, 2, 3, 4, 5].map((index) => (
                <div
                  key={index}
                  className="h-[180px]  rounded-lg bg-gray-200 animate-pulse"
                ></div>
              ))
            ) : menu.length > 0 ? (
              menu.map((item, index) => (
                <div
                  key={index}
                  className="bg-white flex "
                >
                  <MenuCard data={item} />
                </div>
              ))
            ) : (
              <p className="text-gray-500">No items available</p>
            )}
          </div>
        </div>
      )}
    </div>
  </div>
</CustomerLayout>

  )
}

export default RestaurantDetailPage
