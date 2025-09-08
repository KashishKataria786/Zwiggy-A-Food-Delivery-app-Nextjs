"use client"

import React, { useEffect, useState } from 'react'

const No_Internet = () => {
  const [isOnline,setIsOnline]= useState(true);
  useEffect(()=>{
    setIsOnline(navigator.onLine);

    const handleOnline =()=>setIsOnline(true);
    const handleOffline = ()=>setIsOnline(false);

    window.addEventListener('online',handleOnline);
    window.addEventListener('offline', handleOffline);

    return()=>{
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  },[])

  if(isOnline)return null;
  return (
    <div className="fixed inset-0 bg-[#F5F4E1]  bg-opacity-95 flex flex-col items-center justify-center z-[9999]">
      <img src='/noOnline.gif'/>
      <h1 className="text-3xl font-bold text-black mb-4">
         No Internet Connection
      </h1>

      <p className="text-black mb-6 text-center max-w-md">
        It looks like you’re offline. Please check your connection.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition"
      >
        Retry
      </button>
    </div>
  )
}

export default No_Internet
