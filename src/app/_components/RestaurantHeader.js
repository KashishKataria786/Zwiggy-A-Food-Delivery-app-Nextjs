"use client";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

const RestaurantHeader = () => {
  const [details, setDetails] = useState();
  const pathname = usePathname();
  const router= useRouter();
  useEffect(() => {
    let data = localStorage.getItem("RestaurantUser");
    if (!data) {
      router.push("/restaurant");
    } else if (data&&pathname==="/restaurant"){
      router.push('/restaurant/dashboard')
    }else {
      setDetails(JSON.parse(data));
    }
  }, []);

  const Logout = ()=>{
    localStorage.removeItem('RestaurantUser');
    router.push('/restaurant');
  }

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-semibold text-orange-500">Zwiggy</div>

        {/* Navigation Links */}
        <nav>
          <ul className="flex items-center space-x-6 text-sm text-gray-700 font-medium">
            <li>
              <Link href="/" className="hover:text-orange-500 transition">
                Home
              </Link>
            </li>

            {details && details.restaurantName ? (
              <li>
                <Link
                  href="/profile"
                  className="hover:text-orange-500 transition"
                >
                  Profile
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  href="/login"
                  className="hover:text-orange-500 transition"
                >
                  Login/Signup
                </Link>
              </li>
            )}
            <li>
              <button onClick={Logout} className="px-5 py-2 rounded-md bg-orange-500 hover:bg-orange-600 text-white font-medium transition duration-200 shadow-sm">
                Log out
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default RestaurantHeader;
