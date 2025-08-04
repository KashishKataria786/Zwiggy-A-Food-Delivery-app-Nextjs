"use client"
import DashboardLayout from "@/app/_components/_layout/DashboardLayout"
import AddFoodItem from "@/app/_components/AddFoodItem"
import FoodItemList from "@/app/_components/FoodItemList"
import ModalComponent from "@/app/_components/ModalComponent"
import RestaurantHeader from "@/app/_components/_auth/RestaurantHeader.js"
import { useState } from "react"

const Dashboard = () => {
  const [addItem,setAddItem]= useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <DashboardLayout>
      <button onClick={()=>setAddItem(!addItem)}>Add Food</button>
    <button>Dashboard</button>
    {
      addItem?<AddFoodItem/>: <FoodItemList/>

    }
    <div>

    </div>
    </DashboardLayout>
    
    </>
    
  )
}

export default Dashboard