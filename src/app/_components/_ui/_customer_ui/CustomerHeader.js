"use client"
import { ShoppingCart, User } from "lucide-react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { useAuth } from "@/app/context/AuthContext";

export default function CustomerHeader() {


  const {user, logout} = useAuth();
  const {items}=useSelector((state)=>state.cart)

  const router= useRouter();
 

  return (
    <header className="bg-white  sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-1 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
              className="h-[75px] rounded-full w-auto"
              src="/logo.webp"
            />
          <span className="text-xl font-bold text-gray-800">Swiggy</span>
        </div>


        {/* Right Section */}
        <div className="flex items-center gap-6">
          {user?
          <>
          <button onClick={()=>router.push('/my-profile')}>{user?.name}</button>
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
