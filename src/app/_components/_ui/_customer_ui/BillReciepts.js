"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const BillReceipt = () => {
  const cartItems =JSON.parse(localStorage.getItem('CartData')) || [];
  const {user,loggedIn}= useAuth();
  const dispatch = useDispatch();
  const router= useRouter();

  // Subtotal Calculation
  const subTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const deliveryFee = subTotal > 300 ? 0 : 30;
  const tax = +(subTotal * 0.05).toFixed(2); 
  const grandTotal = subTotal + deliveryFee + tax;


   const placeOrder = async () => {
  try {
    let user_Id = user?.sub;
    let restaurant_Id = cartItems[0]?.restaurant_id;
    let foodItems = cartItems.map((item) => {return({ id:item._id,qty:item.qty})});
    let deliveryAgent_id = "68b41750e31741dc8c8e6149"; 
    
    let collection = {
      user_Id:user?.sub,
      // cart: cartItems, 
      restaurant_Id,
      foodItems:foodItems,
      deliveryAgent_id:deliveryAgent_id,
      status: "confirmed",
      amountToPay: grandTotal,
    };

    let response = await fetch("http://localhost:3000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify(collection),
    });

    response = await response.json();
    console.log("respone",response)
    if (!response.success) {
      toast.error("Order not placed");
      return;
    }

    console.log("Order placed:", collection);
    toast.success(response.message);
    // dispatch(clearCart);
    localStorage.removeItem('CartData');
    router.push('/my-profile');
  } catch (error) {
    console.log("Order error:", error);
    toast.error("Something went Wrong");
  }
};

  

  return (
   <div className="px-5 py-5 bg-white border border-gray-100 rounded-sm shadow-md space-y-5 relative">
  {/* Restaurant Detail Section */}
  <div className="flex items-center gap-3 border-b pb-3">
    <img
      className="h-12 w-12 rounded-lg object-cover"
      src="/restaurant-placeholder.jpg"
      alt="restaurant"
    />
    <div className="flex flex-col">
      <h1 className="text-base font-bold text-gray-900">Kulcha Theka</h1>
      <h2 className="text-sm font-medium text-gray-500">Mohali</h2>
    </div>
  </div>

  {/* Cart Item Menu */}
  <div className="space-y-3">
    {cartItems.map((item, index) => (
      <div
        key={index}
        className="flex justify-between items-center text-sm"
      >
        <div className="flex items-center gap-2">
          <img src="/veg-icon.png" className="h-4 w-4" alt="veg" />
          <span className="text-green-600 font-bold">{item.qty}×</span>
          <p className="text-gray-800">{item.name}</p>
        </div>
        <p className="font-medium text-gray-700">₹{item.price * item.qty}</p>
      </div>
    ))}
  </div>

  {/* Suggestion Box */}
  <div>
    <textarea
      className="w-full rounded-lg p-3 text-sm bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none"
      placeholder="Any suggestions? (e.g. Less spicy, no onion)"
      rows={2}
    />
  </div>

  {/* Bill Details */}
  <div className="border-t pt-4 space-y-2 text-sm">
    <h1 className="text-gray-800 font-semibold">Bill Details</h1>

    <div className="flex justify-between">
      <p>Subtotal</p>
      <p>₹{subTotal}</p>
    </div>
    <div className="flex justify-between">
      <p>Delivery Fee</p>
      <p className={deliveryFee === 0 ? "text-green-600 font-semibold" : ""}>
        {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
      </p>
    </div>
    <div className="flex justify-between">
      <p>Tax (5%)</p>
      <p>₹{tax}</p>
    </div>

    <hr />

    <div className="flex justify-between font-bold text-lg">
      <p>Total</p>
      <p>₹{grandTotal}</p>
    </div>
  </div>

  {/* Sticky Place Order Button */}
  <div className="sticky bottom-0 pt-3">
    <button
      onClick={placeOrder}
      className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold text-base shadow-md"
    >
      Place Order
    </button>
  </div>
</div>

  );
};

export default BillReceipt;
