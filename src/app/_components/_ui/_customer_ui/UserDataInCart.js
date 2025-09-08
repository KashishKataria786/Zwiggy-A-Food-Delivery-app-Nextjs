"use client"
import React, { useEffect, useState } from 'react';
import { FaUserAlt, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaCity } from 'react-icons/fa';

const UserDataInCart = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem("User");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  return (
    <div className="w-full  bg-white rounded-sm shadow-sm px-6 py-5 mb-6">
      {/* User Details */}
      <div className="space-y-4 text-sm text-gray-700">
        <DetailRow icon={<FaUserAlt />} label="Name" value={user?.name} />
        <DetailRow icon={<FaEnvelope />} label="Email" value={user?.email} />
        <DetailRow icon={<FaPhoneAlt />} label="Contact" value={user?.contact} />
        <DetailRow icon={<FaCity />} label="City" value={user?.city} />
        <DetailRow icon={<FaMapMarkerAlt />} label="Address" value={user?.address} />
      </div>
    </div>
  );
};



const DetailRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-4">
    {/* Icon Container */}
    <div className="flex items-center justify-center w-6 h-6 rounded-md bg-green-50 text-green-600 text-base">
      {icon}
    </div>

    {/* Text Info */}
    <div className="flex flex-col">
      <span className="text-[10px] text-gray-900 ">{label}</span>
      <span className="text-[12px] font-semibold text-gray-800">{value || 'N/A'}</span>
    </div>
  </div>
);


export default UserDataInCart;
