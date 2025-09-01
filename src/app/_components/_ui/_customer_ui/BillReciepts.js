"use client";
import React from "react";
import { useSelector } from "react-redux";

const BillReceipt = () => {
  const cartItems = useSelector((state) => state.cart.items);
  // Subtotal Calculation
  const subTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const deliveryFee = subTotal > 300 ? 0 : 30;
  const tax = +(subTotal * 0.05).toFixed(2); // 5% tax
  const grandTotal = subTotal + deliveryFee + tax;

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
        {cartItems.map((item) => (
          <div
            key={item.id}
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
      <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 font-semibold">
        Place Order
      </button>
    </div>
  );
};

export default BillReceipt;
