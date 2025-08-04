"use client"
import React from 'react'
import Dashboard from '../dashboard/page'
import AddFoodItem from '@/app/_components/AddFoodItem'
import DashboardLayout from '@/app/_components/_layout/DashboardLayout'

const AddFoodItemPage = () => {
  return (
    <DashboardLayout>
        <AddFoodItem/>
    </DashboardLayout>
  )
}

export default AddFoodItemPage
