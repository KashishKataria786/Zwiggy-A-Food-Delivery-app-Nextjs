"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SideModal from "../SideModal";
import LoadingSpinner from "../LoadingSpinner";
import CustomerOrderDetails from "./CustomerOrderDetails";

const MyOrders = () => {
  const [orderData, setOrderData] = useState([]);
   const [loading, setLoading] = useState(true);
   const [open, setOpen] = useState(false);
   const [particularOrderData, setParticularOrderData] = useState(null);
   const [customerData, setCustomerData] = useState([]);
   const [foodData, setFoodData] = useState([]);
   const [filter, setFilter] = useState("");
 
   // API Function to Retrieve All Orders andusing backend filteration as well
   const loadAllOrder = async () => {
     try {
       const id = JSON.parse(localStorage.getItem("User"))?._id;
       if (!id) {
         toast.error("Restaurant ID not found");
         setLoading(false);
         return;
       }
 
       let url = `http://localhost:3000/api/customer/orders/${id}`;
       
       console.log(url);
       let response = await fetch(url);
       response = await response.json();
 
       if (!response) {
         toast.error(response.message || "No Orders Found");
         setLoading(false);
         return;
       }
 
       setOrderData(response?.result || []);
     } catch (error) {
       console.error(error);
       toast.error("Failed to load orders");
       setLoading(false);
     } finally {
       setLoading(false);
     }
   };
 
   useEffect(() => {
     loadAllOrder();
   }, [filter]);
  return (
     <>

        <div className="py-6">
          <h2 className="text-2xl font-bold mb-4">Past Orders</h2>
          {loading && <LoadingSpinner size={80} />}

          {!loading && orderData.length === 0 ? (
             
    <div className=" flex flex-col items-center justify-center  text-center px-4">
      <h1 className="text-4xl md:text-3xl font-bold text-gray-800 mb-6">
        Start by Adding a New Order!
      </h1>

      <img
        src="/no-order.gif"
        alt="Add order"
        className="w-64 md:w-80  mb-8"
      />

      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-sm shadow-md hover:bg-orange-600 transition"
      >
        Go to Homepage
      </button>
    </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {orderData.map((order, index) => (
                <div
                  onClick={() => {
                    setParticularOrderData(order);
                    setOpen(true);
                  }}
                  key={order._id || index}
                  className="bg-white rounded-2xl shadow-md p-4 border border-gray-200 hover:shadow-lg transition"
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    Order #{index + 1}
                  </h3>

                  <p className="text-sm text-gray-600 mt-1">
                    Order ID: <span className="font-medium">{order._id}</span>
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    Customer ID:{" "}
                    <span className="font-medium">{order.user_Id}</span>
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    Items:{" "}
                    <span className="font-medium">
                      {order.foodItemsIds?.length || 0}
                    </span>
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    Status:{" "}
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        order.status === "delivered"
                          ? "bg-green-300 text-green-600"
                          : order.status === "confirmed"
                          ? "bg-blue-300 text-blue-600"
                          : order.status === "pending"
                          ? "bg-yellow-300 text-yellow-600"
                          : order.status === "cancelled"
                          ? "bg-red-300 text-red-600"
                          : order.status === "preparing"
                          ? "bg-orange-300 text-orange-600"
                          : "bg-gray-300 text-red-700"
                      }`}
                    >
                      {order.status || "Unknown"}
                    </span>
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    Total:{" "}
                    <span className="font-medium">
                      ₹{order.amountToPay?.toFixed(2) || 0}
                    </span>
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    Placed On:{" "}
                    <span className="font-medium">
                      {new Date(order.createdAt).toLocaleString()}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      <SideModal isOpen={open} onClose={() => setOpen(false)}>
        <h1 className="my-3 text-3xl ">Order Details </h1>
        <CustomerOrderDetails data={particularOrderData}  onOrderUpdated={loadAllOrder} onClose={()=>setOpen(false)}  />
      </SideModal>     </>
  );
};

export default MyOrders;
