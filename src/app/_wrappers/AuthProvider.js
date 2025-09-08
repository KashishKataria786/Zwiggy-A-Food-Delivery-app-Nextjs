import React from 'react'
import { AuthProvider } from '../context/AuthContext'
const AuthProviderWrapper =({children}) => {
  return (
    <>
    <AuthProvider>
    {children}
    </AuthProvider>
    </>
  )
}

export default AuthProviderWrapper
