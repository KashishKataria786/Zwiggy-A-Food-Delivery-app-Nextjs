import DashboardLayout from '@/app/_components/_layout/DashboardLayout'
import FoodItemList from '@/app/_components/FoodItemList'
import React from 'react'

const menuPage = () => {
  return (
  <>
    <DashboardLayout>
      <FoodItemList/>
    </DashboardLayout>
  </>
  )
}

export default menuPage
