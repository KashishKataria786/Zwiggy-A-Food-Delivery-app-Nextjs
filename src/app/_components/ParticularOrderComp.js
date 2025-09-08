import React, { useEffect, useState } from 'react'
import LoadingSpinner from './_ui/LoadingSpinner';
import { toast } from 'react-toastify';

const ParticularOrderComp = ({ data = {} }) => {
  const [loading, setLoading] = useState(true);
  const [foods, setFoods] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [status,setStatus]= useState(data?.status)


  const loadParticularOrderDetails = async () => {
    console.log("Data",status)
    try {
      if (!data?._id) return; // prevent running without order data

      const orderID = data._id;
      const customerID = data.user_Id;
      const restaurant_Id = data.restaurant_Id;

      // // ✅ Fetch customer details
      // const customerRes = await fetch(`http://localhost:3000/api/customer/customerDetails/${customerID}`);
      // const customerJson = await customerRes.json();
      // setCustomer(customerJson?.result || null);

      // ✅ Fetch all food item details in parallel
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
    let response = await fetch(`http://localhost:3000/api/orders/${data._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }), // ✅ send object
    });

    let result = await response.json();

    if (!response.ok) {
      toast.error(result.message || "Error updating status");
      return;
    }

    toast.success("Status changed successfully");
    console.log("Changed status:", result.data);
  } catch (error) {
    console.error("Status update error:", error);
    toast.error("Something went wrong");
  }
};

  useEffect(() => {
    loadParticularOrderDetails();
  }, [data,status]); 

  if (loading) return <LoadingSpinner size={50}/>;

  return (
   <div className="p-6 bg-white border border-gray-200 rounded-sm space-y-4">
    <div className='flex justify-between items-center'>
      <h1>Order Details</h1>
           <div className="">
            <select
              id="status"
              value={status}
              onChange={(e) => {setStatus(e.target.value) 
                handleStatusChange();
              }}
              className="mt-2 block w-48 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300"
            >
         
              <option value="confirmed">Confirmed</option>
              <option value="preparing">Preparing</option>
              <option value="on-the-way">On the way</option>
            </select>
          </div>
    </div>
    

  {/* Header */}
  <div className="flex justify-between items-center border-b pb-3">
    <h2 className="text-xl font-semibold text-gray-800">Order No {}</h2>
    <span className="text-sm text-gray-500">#{data?._id?.slice(-6)}</span>

  </div>
  

  {/* Food Items */}
  <div className="space-y-3">
    <h3 className="text-md font-medium text-gray-700">Food Items</h3>

    {foods.map((item, index) => (
      <div
        key={index}
        className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
      >
        {/* Left */}
        <div className="flex items-center gap-3">
          <img
            src="/veg-icon.png"
            alt="veg-icon"
            className="h-[16px] w-[16px]"
          />
          <span className="text-green-600 font-bold">
            {item.qty ? item.qty : 1}×
          </span>
          <p className="text-gray-800 font-medium">{item.food.name}</p>
        </div>

        {/* Right */}
        <p className="font-semibold text-gray-900">
          ₹{item.food.price * (item.qty ? item.qty : 1)}
        </p>
      </div>
    ))}
  </div>

  {/* Total */}
  <div className="pt-3 border-t flex justify-between items-center">
    <span className="text-gray-700 font-medium">Total Amount</span>
    <span className="text-lg font-semibold text-gray-900">
      ₹{data?.amountToPay}
    </span>
  </div>
</div>

  )
}

export default ParticularOrderComp
