'use client'
import React, { useState } from 'react'
import Footer from '../_components/_layout/Footer';
import CustomerLogin from '../_components/_auth/CustomerLogin';
import CustomerRegister from '../_components/_auth/CustomerRegister';
import CustomerLayout from '../_components/_layout/CustomerLayout';

function CustomerAuth() {
    const [login,setLogin]= useState(true);
  return (
    <>
    <CustomerLayout>
    <div className='flex flex-col justify-center items-center text-center min-h-screen w-full'>
      {login? <CustomerLogin/> :<CustomerRegister/>}
    <div>
        <button className='text-sm font-light text-blue-500  my-5' onClick={()=>setLogin(!login)}>{login?<><span className='font-md text-gray-500'>Already have an Account?</span> Login!</> :"Login "}</button>
    </div>
      </div>
    </CustomerLayout>
    </>
  )
}

export default CustomerAuth
