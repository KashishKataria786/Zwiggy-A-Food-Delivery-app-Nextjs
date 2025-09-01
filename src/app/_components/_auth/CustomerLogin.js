"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const CustomerLogin = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError]= useState(false);
  const router= useRouter();


  const handleLogin= async()=>{
    if(!email ||!password){
      setError(true);
      return false;
    }else{
      setError(false);
    }
    let response = await fetch("http://localhost:3000/api/users-auth/login", {method:'POST', body:JSON.stringify({email,password,login:true})});

    response=await response.json();
    console.log(response)
    if(response.success){
      toast.success("Login successful")
      const {result} = response;
      console.log(result)
      delete result.password
      localStorage.setItem('User',JSON.stringify(result));
      router.push('/')
    }else{
      toast.error("Login unsuccessful! Try Again")
    }


  }
  return (
   <div className="w-full max-w-sm">
    <h1 className="text-3xl font-bold text-gray-900 mb-6">Customer Login</h1>

    <form className="space-y-4 text-left" onSubmit={handleLogin}>
      <div>
        <label htmlFor="email" className="block text-sm text-gray-700 mb-1">
          Email address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        {error&&!email&&<span className="text-[12px] font-light text-red-500">
              "Missong fields"
            </span>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="••••••••"
           value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
         {error&&!password&&<span className="text-[12px] font-light text-red-500">
              "Missong fields"
            </span>}
      </div>

      <button
        type="submit"
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-medium transition duration-200"
      >
        Login
      </button>
    </form>

    <p className="text-sm text-center text-gray-500 mt-6">
      New to the app?{" "}
      <a href="#" className="text-orange-500 hover:underline font-medium">Create an account</a>
    </p>
  </div>
  )
}

export default CustomerLogin
