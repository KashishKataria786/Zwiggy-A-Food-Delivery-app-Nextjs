"use client"

import React, { useState } from "react";
import {
  FaUtensils,
  FaPlusCircle,
  FaClipboardList,
} from "react-icons/fa";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoLogOutSharp } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, PersonStandingIcon } from "lucide-react";

// Sidebar Link Component
const SidebarLink = ({ icon, label, expand, path }) => {
  const pathname = usePathname();
  const router = useRouter();
  

  return (
    <div
      onClick={() => router.push(path)}
      className={`${
        path === pathname ? "bg-gray-800 text-white" : ""
      } flex items-center ${
        expand ? "justify-start" : "justify-center"
      } gap-3 border border-gray-100 hover:text-white hover:bg-gray-800 px-3 py-4 rounded-full cursor-pointer transition`}
    >
      <span className="text-md">{icon}</span>
      {expand && <span className="text-sm font-medium">{label}</span>}
    </div>
  );
};

// Auth / User Section
const HeaderAuth = ({ onLogout }) =>{
  const user = JSON.parse(localStorage.getItem("RestaurantUser"));
  return(
  <div className="space-y-2">
    <div className="flex gap-3 items-center justify-between">
      <div className="flex gap-2 bg-white px-2 pr-4 rounded-full p-1">
        <img
          className="h-[45px] w-[45px] rounded-full object-cover"
          src="https://avatar.iran.liara.run/public"
          alt="User Avatar"
        />
        <div>
          <h1 className="text-md font-medium">{user?.restaurantName}</h1>
          <p className="text-[12px] font-light">{user?.email}</p>
        </div>
      </div>
    </div>
    <SidebarLink
    icon={<PersonStandingIcon/>}
    label="Profile"
    />

    <button
      onClick={onLogout}
      className="flex items-center gap-2 w-full p-3 bg-red-500 hover:bg-red-600 text-white rounded-full transition"
    >
      <IoLogOutSharp />
      <span>Logout</span>
    </button>
  </div>
);
}
// Sidebar Component
const Sidebar = () => {
  const [expand, setExpand] = useState(true);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("RestaurantUser");
    router.push("/restaurant");
  };

  return (
    <aside
      className={`flex flex-col justify-between bottom-0 left-0 z-50 h-[100vh] bg-white text-gray-700 py-6 shadow-md transition-all duration-200 ${
        expand ? "w-64 px-6" : "w-16 px-2"
      }`}
    >
     
      <div>
         {/* Logo Section */}
        <div className="flex gap-4 items-center mb-10">
        <img className="h-[55px] w-[55px] rounded-full" src="/logo.webp" alt="Logo" />
        {expand && <span className="text-xl font-semibold">Swiggy</span>}
      </div>

      {/* Navigation */}
      <nav className="space-y-4">
        <SidebarLink
          expand={expand}
          label="Dashboard"
          icon={<MdOutlineSpaceDashboard />}
          path="/restaurant/dashboard"
        />
        <SidebarLink
          expand={expand}
          icon={<FaUtensils />}
          label="Menu"
          path="/restaurant/menu"
        />
        <SidebarLink
          expand={expand}
          icon={<FaPlusCircle />}
          label="Add Item"
          path="/restaurant/add-food-item"
        />
        <SidebarLink
          expand={expand}
          icon={<FaClipboardList />}
          label="Orders"
          path="/restaurant/orders"
        />
      </nav>
      </div>

      {/* User Section */}
      <div className="mt-10">
        <HeaderAuth onLogout={handleLogout} />
      </div>
    </aside>
  );
};

// Main Layout
const DashboardLayout = ({ children }) => {
  return (
    <div className="flex sticky left-0 top-0">
      <Sidebar />
      <main className="flex-1 bg-gray-50 p-8 h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
