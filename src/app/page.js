"use client"
import { ToastContainer } from "react-toastify";
import CustomerLayout from "./_components/_layout/CustomerLayout";
import { MapPin, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "./_components/_ui/LoadingSpinner";
import ProtectedRoute from "./_wrappers/ProtectedRoute";

export default function Home() {
  const [allLocations, setAllLocations] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [selectLocation, setSelectLocation] = useState('');
  const [showLocationMenu, setShowLocationMenu] = useState(false);
  const [loading,setLoading]=useState(true);
  const router = useRouter();


  //Funciton to Load All Locations Saved in the Database!
  const LoadLocationAPI = async () => {
    try {
      let response = await fetch('http://localhost:3000/api/customer/locations');

      if (!response.ok) {
        throw new Error("Failed to fetch locations");
      }

      let data = await response.json();
      setAllLocations(data.result); // assuming API returns { result: [...] }
      console.log("Result:", data.result);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const LoadRestaurantListAPI = async (params = {}) => {
    setLoading(true);
    try {
      let url = "http://localhost:3000/api/customer";

      // add query params dynamically
      if (params.location) {
        url += `?location=${encodeURIComponent(params.location)}`;
      } else if (params.restaurant) {
        url += `?restaurant=${encodeURIComponent(params.restaurant)}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch restaurants");
        setLoading(false);
      }

      const data = await response.json();

      setAllRestaurants(data.result || []); // safe fallback
      console.log("Result:", data.result);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      setLoading(false);
    }finally{
      setLoading(false);
    }
  };


  const handleListItem = (item) => {
    setSelectLocation(item);
    setShowLocationMenu(false);
    LoadRestaurantListAPI({ location: item });
  }

  useEffect(() => {
    LoadLocationAPI();
    LoadRestaurantListAPI();
  }, [])
  return (
    <>

      <ToastContainer position="top-right" autoClose={1000} />
      <CustomerLayout>
        <div className="relative h-auto py-10 flex items-center justify-center text-center ">
          {/* Background with overlay */}
          <div className="absolute inset-0 bg-[url('/hero-banner.jpg')] bg-cover bg-center  bg-blend-multiply" />


          {/* Content */}
          <div className="relative z-10 max-w-3xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-600 mb-8 leading-snug">
              Discover the best restaurants & foods.{" "}
              <span className="text-orange-700">Swiggy it!</span>
            </h1>

            {/* Inputs */}
            <div className="flex flex-col md:flex-row gap-3 justify-center">
              {/* Location Input */}
              <div className="relative w-full md:w-1/3">
                <div className="flex items-center border border-gray-300 rounded-md bg-white px-2 py-4 text-sm">
                  <MapPin className="text-gray-500 mr-2" size={18} />
                  <input
                    type="text"
                    placeholder="Search Location"
                    value={selectLocation}
                    onClick={() => setShowLocationMenu(true)}
                    onChange={(e)=>setSelectLocation(e.target.value)}
                    className="w-full outline-none text-gray-700 text-sm"
                  // value={searchTerm}
                  // onChange={(e) => setSearchTerm(e.target.value)} // if you want filtering
                  />
                </div>

                {/* Dropdown list */}
                {showLocationMenu && allLocations?.length > 0 && (
                  <ul className="absolute text-left font-semibold no-scrollbar z-10 bg-white border border-gray-200 rounded-md shadow-md w-full mt-1 max-h-48 overflow-y-auto">
                    {allLocations.map((city, index) => (
                      <li
                        key={index}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
                        onClick={() => handleListItem(city)}
                      >
                        {city ? city : "Rohtak"}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Restaurant Input */}
              <div className="flex items-center w-full md:w-1/3 border border-gray-300 rounded-md bg-white px-2 py-4 text-sm">
                <Search className="text-gray-500 mr-2" size={18} />
                <input
                  type="text"
                  placeholder="Search Restaurant"
                  className="w-full outline-none text-gray-700 text-sm"
                  onChange={(event) => LoadRestaurantListAPI({ restaurant: event.target.value })}
                />
              </div>
            </div>
          </div>

        </div>
        <div className="bg-gray-100">
          {loading&&<LoadingSpinner size={50}/>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto p-16">
            {allRestaurants?.map((item, index) => (
              <div onClick={()=>router.push(`/explore/${item?.restaurantName}`+"?id="+item._id  )}  key={index} className="max-w-xs w-full bg-white border border-white shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                {/* Image */}
                <div className="relative">
                  <img
                    src={item?.image || "/restaurant-placeholder.jpg"}
                    alt={item?.restaurantName}
                    className="w-full h-40 object-cover"
                  />
                  {/* Main discount badge */}
                  <span className="absolute bottom-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-md">
                    {item?.offer || "30% OFF"}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Restaurant Name */}
                  <h2 className="text-lg font-bold text-gray-800 truncate">
                    {item?.restaurantName}
                  </h2>

                  {/* City */}
                  <p className="text-sm text-gray-600 truncate">📍 {item?.city}</p>

                  {/* Ratings + Delivery Time */}
                  <div className="flex items-center justify-between mt-2 text-sm text-gray-700">
                    <span className="flex items-center gap-1">⭐ {item?.rating || "4.2"}</span>
                    <span>{item?.deliveryTime || "30-40 mins"}</span>
                  </div>

                  {/* Address */}
                  <p className="text-sm text-gray-500 mt-1 truncate">{item?.address}</p>

                  {/* 🔥 Extra discount section */}
                  {item?.extraDiscount && (
                    <div className="mt-3 bg-orange-100 border border-orange-200 rounded-lg px-3 py-2 text-sm text-orange-700 font-medium">
                      {item?.extraDiscount}
                    </div>
                  )}
                </div>
              </div>

            ))}
          </div>

        </div>
      </CustomerLayout>
    </>
  );
}
