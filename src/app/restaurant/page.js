'use client'
import React, { useState } from 'react'
import RestaurantLogin from '../_components/_auth/RestaurantLogin'
import RestaurantSignup from '../_components/_auth/RestaurantSignup'
import RestaurantHeader from '../_components/_auth/RestaurantHeader';
import Footer from '../_components/_layout/Footer';

function Restaurant() {
    const [login,setLogin]= useState(true);
  return (
    <>
    <RestaurantHeader/>
    <div className='flex flex-col justify-center items-center text-center min-h-screen w-full'>
      {login? <RestaurantLogin/> :<RestaurantSignup/>}
    <div>
        <button className='text-sm font-light text-blue-500  my-5' onClick={()=>setLogin(!login)}>{login?<><span className='font-md text-gray-500'>Already have an Account?</span> Login!</> :"Login "}</button>
    </div>
      </div>
      <Footer/>
    </>
  )
}

export default Restaurant
