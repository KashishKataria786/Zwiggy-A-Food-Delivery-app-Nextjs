"use client"
import DashboardLayout from "@/app/_components/_layout/DashboardLayout"
import LoadingSpinner from "@/app/_components/_ui/LoadingSpinner";
import AnalyticCard from "@/app/_components/AnalyticCard";
import { FaMoneyBillWave, FaShoppingCart } from "react-icons/fa";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { MdCancel } from "react-icons/md";

import { useEffect, useState } from "react"
import { toast } from "react-toastify";

const Dashboard = () => {

  const [orderData,setOrderData]= useState([]);
  const [revenue,setRevenue]=useState(0);
  const [confirmed,setConfirmed]= useState(0);
  const [delivered,setDelivered]= useState(0);
  const [ontheway,setOnTheWay]= useState(0);
  const [cancelled,setCancelled]= useState(0);
  const [preparing,setPreparing]= useState(0);
  const [loading,setLoading]= useState(true);

const loadAllOrder = async () => {
    setLoading(true);
    try {
      const id = JSON.parse(localStorage.getItem("RestaurantUser"))?._id;
      if (!id) {
        toast.error("Restaurant ID not found");
        setLoading(false);
        return;
      }

      let response = await fetch(
        `http://localhost:3000/api/restaurant/orders/${id}`
      );
      response = await response.json();
      const totalRevenue = response?.result.reduce((acc, item) => acc + (item.amountToPay || 0), 0);
      const NoOfOrder = response?.result.length;
      const PendingOrder= response?.result?.filter((item)=>item.status==='confirmed').length
      const CancelledOrder= response?.result?.filter((item)=>item.status==='cancelled').length
      const PreparingOrder= response?.result?.filter((item)=>item.status==='preparing').length
      const OnWayOrder= response?.result?.filter((item)=>item.status==='on-the-way').length
      const DeliveredOrder = response?.result.filter((item)=>item.status==='delivered').length
  
      setRevenue(Math.ceil(totalRevenue));
      setConfirmed(PendingOrder);
      setCancelled(CancelledOrder);
      setPreparing(PreparingOrder);
      setOnTheWay(OnWayOrder);
      setDelivered(DeliveredOrder);
      if (!response.success) {
        toast.error(response.message || "No Orders Found");
        setLoading(false);
        return;
      }

      setOrderData(response?.result || []);
  
    } catch (error) {
      console.error(error);
      toast.error("Failed to load orders");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllOrder();
  }, []);


  return (
    <>
    <DashboardLayout>
     <h1 className="text-3xl font-semibold mb-10">Dashboard Analytics</h1>
     {loading&&<LoadingSpinner size={50}/>}
     <div className="grid grid-cols-5 gap-2 ">
            <AnalyticCard
        label="Revenue"
        data={revenue}
        colorClass="text-green-500"
        icon={FaMoneyBillWave}
      />
      <AnalyticCard
        label="Orders"
        data={confirmed}
        colorClass="text-blue-500"
        icon={FaShoppingCart}
      />
      <AnalyticCard
        label="Preparing"
        data={preparing}
        colorClass="text-red-500"
        icon={MdCancel}
      />
      <AnalyticCard
        label="Completed"
        data={delivered}
        colorClass="text-purple-500"
        icon={AiOutlineCheckCircle}
      />
      <AnalyticCard
        label="Cancelled"
        data={cancelled}
        colorClass="text-red-500"
        icon={MdCancel}
      />
     </div>

    </DashboardLayout>
    
    </>
    
  )
}

export default Dashboard