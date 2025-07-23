'use client'
import React, { useState } from 'react'
import RestaurantLogin from '../_components/RestaurantLogin'
import RestaurantSignup from '../_components/RestaurantSignup'
import RestaurantHeader from '../_components/RestaurantHeader';
import Footer from '../_components/Footer';

function Restaurant() {
    const [login,setLogin]= useState(true);
  return (
    <>
    <RestaurantHeader/>
    <div className='flex flex-col justify-center items-center text-center min-h-screen w-full'>
      {login? <RestaurantLogin/> :<RestaurantSignup/>}
    <div>
        <button className='text-sm font-light text-blue-500  my-5' onClick={()=>setLogin(!login)}>{login?"Dont have a Account ?sign up!" :"Login "}</button>
    </div>
      </div>
      <Footer/>
    </>
  )
}

export default Restaurant
