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
    <div className="px-4 py-4 space-y-4 bg-white border-gray-100 shadow-md">
      {/* Restaurant Detail Section */}
      <div className="flex items-center justify-start gap-3 h-[50px] border-b pb-3">
        <div>
          <img
            className="h-[50px] w-[50px] rounded-md"
            src="/restaurant-placeholder.jpg"
            alt="restaurant"
          />
        </div>
        <div className="flex flex-col justify-between">
          <h1 className="text-sm font-bold">Kulcha Theka</h1>
          <h2 className="text-[12px] font-medium text-gray-600">Mohali</h2>
        </div>
      </div>

      {/* Cart Item Menu */}
      <div className="space-y-3">
        {cartItems.map((item,index) => (
          <div
            key={index}
            className="flex justify-between items-center text-sm"
          >
            <div className="flex items-center gap-2 ">
              <img src='/veg-icon.png' className="h-[15px] w-[15px]"/>
              <span className="text-green-600 font-bold ">{item.qty}×</span>
              <p>{item.name}</p>
            </div>
            <p className="font-md">₹{item.price * item.qty}</p>
          </div>
        ))}
      </div>

      {/* Suggestion Box */}
      <div>
        <textarea
          className="w-full rounded-md p-2 text-sm bg-gray-100"
          placeholder="Any suggestions? (e.g. Less spicy, no onion)"
        />
      </div>

      {/* Bill Details */}
      <div className="border-t pt-3 space-y-2 text-sm">
        <h1>Bill Details</h1>
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>₹{subTotal}</p>
        </div>
        <div className="flex justify-between">
          <p>Delivery Fee</p>
          <p>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</p>
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

      {/* Place Order Button */}
      <button onClick={placeOrder} className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 font-semibold">
        Place Order
      </button>
    </div>
  );
};

export default BillReceipt;
