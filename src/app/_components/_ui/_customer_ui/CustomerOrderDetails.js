  import React, { useEffect, useState } from 'react'
  import LoadingSpinner from '../LoadingSpinner';
  import { toast } from 'react-toastify';

  const CustomerOrderDetails  = ({ data = {} , onOrderUpdated , onClose}) => {
    const [loading, setLoading] = useState(true);
    const [foods, setFoods] = useState([]);
    const [restaurant, setRestaurant] = useState(null);
    const [status,setStatus]= useState(data?.status)


    const loadParticularOrderDetails = async () => {
      console.log("Data",status)
      try {
        if (!data?._id) return; 
        const orderID = data._id;
        const customerID = data.user_Id;
        const restaurant_Id = data.restaurant_Id;

        const RestaurantRes = await fetch(`http://localhost:3000/api/restaurant/${restaurant_Id}`);
        const RestaurantJson = await RestaurantRes.json();
        setRestaurant(RestaurantJson?.result || null);


        const foodRequests = data.foodItems.map((x) =>
          fetch(`http://localhost:3000/api/restaurant/foods/${restaurant_Id}/${x.id}`)
        );

        const foodResponses = await Promise.all(foodRequests);
        const foodData = await Promise.all(foodResponses.map((res) => res.json()));

        const d = foodData.map((x) =>
          {const m = data.foodItems.find(y=>y.id==x.result._id);
          return({
            ...x,
            qty:m.qty
          }
          )
        }
        );

        console.log("data: ",d)
        
        // In case API response is { success, result }
        setFoods(d.map((f) => {return({food:f.result,qty:f.qty})}));

        setLoading(false);
      } catch (error) {
        console.error("Error loading order details:", error);
        setLoading(false);
      }
    };

   const handleStatusChange = async () => {
    if (!status) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/orders/${data._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

      const result = await response.json();
      if (!response.ok) {
        toast.error(result.message || "Error updating status");
        return;
      }
      toast.success(result.message || "Status changed successfully");
      onOrderUpdated();
      onClose();
    } catch (error) {
      console.error("Status update error:", error);
      toast.error("Something went wrong");
    }
  };
    useEffect(() => {
      loadParticularOrderDetails();
    }, [data?._id, data?.restaurant_Id, data?.user_Id, data?.status]); 

    if (loading) return <LoadingSpinner size={50}/>;

    return (
      <>
      
      <div className="p-6 bg-white border border-gray-200 rounded-sm space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="text-xl font-semibold text-gray-800">
          Order #{data?._id?.slice(-6)}
        </h2>

        
      </div>

      {/* Food Items */}
      <div className="space-y-3">
        <h3 className="text-md font-medium text-gray-700">Food Items</h3>
        {foods.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            <div className="flex items-center gap-3">
              <img
                src="/veg-icon.png"
                alt="veg-icon"
                className="h-[16px] w-[16px]"
              />
              <span className="text-green-600 font-bold">
                {item.qty || 1}×
              </span>
              <p className="text-gray-800 font-medium">{item.food.name}</p>
            </div>
            <p className="font-semibold text-gray-900">
              ₹{item.food.price * (item.qty || 1)}
            </p>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="py-3 border-y flex justify-between items-center">
        <span className="text-gray-700 font-medium">Total Amount</span>
        <span className="text-lg font-semibold text-gray-900">
          ₹{data?.amountToPay}
        </span>
      </div>

      {/* Restueant */}
      <div className="p-5 bg-white rounded-sm shadow-sm border border-gray-300">
        <h1 className="text-lg font-semibold text-gray-800 mb-4">
          Restaurant Details
        </h1>
        <div className="space-y-2 text-sm text-gray-600">
          <p>
            <span className="font-medium text-gray-700">Name:</span>{" "}
            {restaurant?.restaurantName}
          </p>
          <p>
            <span className="font-medium text-gray-700">Address:</span>{" "}
            {restaurant?.address}
          </p>
          <p>
            <span className="font-medium text-gray-700">Contact:</span>{" "}
            {restaurant?.contact}
          </p>
          <p>
            <span className="font-medium text-gray-700">City:</span>{" "}
            {restaurant ?.city}
          </p>
        </div>
      </div>
    </div></>
    )
  };


  export default CustomerOrderDetails