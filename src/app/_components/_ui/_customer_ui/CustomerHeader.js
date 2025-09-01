"use client"
import React, { useEffect, useState } from "react";
import { ShoppingCart, User } from "lucide-react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function CustomerHeader() {

  const [localStorgeData,setLocalStorageData] = useState("");
  useEffect(()=>{
    setLocalStorageData(JSON.parse(localStorage.getItem('User')))
  },[])
  const userStorage = localStorgeData
  const [user,setUser] = useState(localStorage?userStorage:undefined);

  const {items}=useSelector((state)=>state.cart);
  const router= useRouter();
 
  console.log("USer Storage", userStorage);

  const logout=()=>{
    localStorage.removeItem('User');
    toast?.success("Logout successfull");
    router?.push('/auth');
  }


  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
              className="h-[55px] rounded-full w-auto"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9xIUhlo7cJ4TZqp7GJSWO6dav22n2O7n2_A&s"
            />
          <span className="text-xl font-bold text-gray-800">Zwiggy</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <a href="#" className="hover:text-orange-500 transition">Home</a>
          <a href="#" className="hover:text-orange-500 transition">Restaurants</a>
          <a href="#" className="hover:text-orange-500 transition">Offers</a>
          <a href="#" className="hover:text-orange-500 transition">Help</a>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {userStorage&&user?
          <>
          <h1>{user?.name}</h1>
          <button onClick={logout} className="flex items-center gap-2 bg-orange-500 px-2 py-1  rounded-sm text-white hover:bg-orange-600 transition">
            <User size={20} />
            <span className="hidden md:inline">LogOut</span>
          </button>
          </>
          :<><button onClick={()=>router.push('/auth')} className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition">
            <User size={20} />
            <span className="hidden md:inline">Login</span>
          </button></>}
          <button onClick={()=>router.push('/explore/cart')} className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition relative">
            <ShoppingCart size={20} />
            <span className="hidden md:inline">Cart</span>
            {/* Cart count */}
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full px-1.5 py-0.5">
              {items.length}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
