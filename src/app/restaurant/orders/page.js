"use client";
import DashboardLayout from "@/app/_components/_layout/DashboardLayout";
import SideModal from "@/app/_components/_ui/SideModal";
import LoadingSpinner from "@/app/_components/_ui/LoadingSpinner";
import ParticularOrderComp from "@/app/_components/ParticularOrderComp";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const OrdersPage = () => {
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
      const id = JSON.parse(localStorage.getItem("RestaurantUser"))?._id;
      if (!id) {
        toast.error("Restaurant ID not found");
        setLoading(false);
        return;
      }

      let url = `http://localhost:3000/api/restaurant/orders/${id}`;
      if (filter !== "") {
        url = `http://localhost:3000/api/restaurant/orders/${id}?status=${filter}`;
      }
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
      <DashboardLayout>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Orders</h2>
          {/* Dropdown for Filter */}
           <div className="py-4">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="status"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="mt-2 block w-48 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300"
            >
              <option value="">All</option>
              <option value="confirmed">Confirmed</option>
              <option value="preparing">Preparing</option>
              <option value="on-the-way">On the way</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {loading && <LoadingSpinner size={80} />}

          {!loading && orderData.length === 0 ? (
            <p className="text-gray-600">No <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        filter === "delivered"
                          ? "bg-green-300 text-green-600"
                          : filter === "confirmed"
                          ? "bg-blue-300 text-blue-600"
                          : filter === "pending"
                          ? "bg-yellow-300 text-yellow-600"
                          : filter === "cancelled"
                          ? "bg-red-300 text-red-600"
                          : filter === "preparing"
                          ? "bg-orange-300 text-orange-600"
                          : "bg-gray-300 text-red-700"
                      }`}
                    >
                      {filter || "Unknown"}
                    </span> orders available</p>
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
      </DashboardLayout>
      <SideModal isOpen={open} onClose={() => setOpen(false)}>
        <h1 className="my-3 text-3xl ">Order Details </h1>
        <ParticularOrderComp data={particularOrderData}  onOrderUpdated={loadAllOrder} onClose={()=>setOpen(false)}  />
      </SideModal>
    </>
  );
};

export default OrdersPage;
