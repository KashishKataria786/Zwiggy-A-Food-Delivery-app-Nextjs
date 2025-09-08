"use client"
import { AuthContext, useAuth } from '@/app/context/AuthContext'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const MyOrders = () => {

    const {user} =useAuth();
    const [orders,setOrders] = useState([]);

    const loadOrderData=async()=>{
        const id =JSON.parse(localStorage.getItem('User'))._id;
        try {
          let orderData = await fetch('http://localhost:3000/api/orders?id='+id);
          orderData = await orderData.json();
          console.log(orderData);
          setOrders(orderData?.result);
        } catch (error) {
            toast.error("Error");
        }
    }
    useEffect(()=>{
        loadOrderData();
    },[])
  return (
    <div>
      My Orders
      {/* {JSON.parse(orders,null,2)} */}
      {orders?.map((item,index)=><h1>{item.status}</h1>)}
    </div>
  )
}

export default MyOrders
