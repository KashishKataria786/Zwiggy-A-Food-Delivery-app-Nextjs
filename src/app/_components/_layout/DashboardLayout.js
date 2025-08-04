import React, { useState } from 'react';
import { FaUtensils, FaPlusCircle, FaClipboardList, FaSignOutAlt, FaAlignRight, FaSearch } from 'react-icons/fa';
import { RiBellLine, RiExpandLeftFill, RiExpandRightFill } from "react-icons/ri";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoLogOutSharp } from "react-icons/io5";
import { router } from 'next/navigation';

const Logout = ()=>{
    localStorage.removeItem('RestaurantUser');
    router.push('/restaurant');
}

const Sidebar = () => {
    const [expand,setExpand]= useState(false);
  return (
    <aside className={` ${expand ? 'w-64 px-6 rounded-md transition-all duration-100':'w-16 px-2 rounded-full transition-all duration-200'}    min-h-[90vh] bg-gray-100 bg-white text-gray-700 py-6 space-y-6`}>
      <SidebarLink expand={expand} label="Dashboard" icon={<MdOutlineSpaceDashboard />}/>

      <nav className="space-y-4">
        <SidebarLink expand={expand}  icon={<FaUtensils />} label="Food Items" />
        <SidebarLink expand={expand} icon={<FaPlusCircle />} label="Add Item" />
        <SidebarLink expand={expand} icon={<FaClipboardList />} label="Orders" />
        <SidebarLink expand={expand} icon={<FaSignOutAlt />} label="Logout" />
        <button expand={expand} onClick={()=>setExpand(!expand)} ><SidebarLink  label="collapse" expand={expand} icon={expand?<RiExpandLeftFill/>:<RiExpandRightFill/>}/></button>
      </nav>
    </aside>
  );
};  

const SidebarLink = ({ icon, label, expand=false }) => (
  <div className="flex items-center justify-center gap-3 border border-gray-100 text-gray-700 hover:text-white hover:bg-gray-800 px-3 py-4 rounded-full cursor-pointer transition">
    <span className="text-md">{icon}</span>
    {
        expand?<span className="text-sm font-medium">{label}</span>:<></>
    }
  </div>
);

const Header = ()=>{
  return(
    <>
    <div  className='grid grid-cols-6 gap-2 p-2 bg-gray-50 sticky top-0  z-50'>
    <div className='flex gap-5  items-center p-1 min-w-64'>
      <div>
        <img className='h-[55px] rounded-full w-auto' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9xIUhlo7cJ4TZqp7GJSWO6dav22n2O7n2_A&s"/>
      </div>
      <span className='text-xl font-semibold'>Zwiggyt</span>
    </div>
    <div className='col-span-5' >
    <div className='flex  items-center justify-between  w-full'>
      <div className='px-4 py-2 flex gap-2 items-center border rounded-full border-gray-200 bg-white'>
        <div className='p-2  rounded-full bg-gray-50 text-gray-600 '>
          <FaSearch/>
        </div>
        <input type='search' placeholder='Search'/>
        </div>
      <div className=' flex gap-3 items-center justify-between '>
        <div className='p-4 bg-white rounded-full'>
          <RiBellLine />
        </div>
        <div className='flex  gap-2 bg-white px-2 pr-4 rounded-full p-1 '>
          <div >
            <img className='h-[45px] w-auto' src="https://avatar.iran.liara.run/public" />
          </div>
          <div>
            <h1 className='text-md font-md '>Kashish  </h1>
            <p className='text-[12px] font-light'>Restaurant USer</p>
          </div>
        </div>
        <div className='p-4 bg-red-400  text-white rounded-full'>
          <IoLogOutSharp />
        </div>
      </div>
    </div>
    </div>
    </div>
    </>
  )
}

const DashboardLayout = ({ children }) => {
  return (
    <>
      <Header/>
      <div className="flex  sticky left-0 top-0">
        <div className='bg-gray-50 p-2 '>
            <Sidebar />
        </div>
        <main className="flex-1 bg-gray-50 p-8 h-screen overflow-y-auto">
          {children}
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
