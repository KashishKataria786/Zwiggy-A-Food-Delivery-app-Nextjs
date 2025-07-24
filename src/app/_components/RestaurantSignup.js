"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const RestaurantSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [c_password, setC_password] = useState("");
  const [contact, setContact] = useState("");
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const router = useRouter();

  const handleSignup = async () => {
    if (password !== c_password) {
      setPasswordError(true);
      return;
    } else {
      setPasswordError(false);
    }
    if (
      !email ||
      !password ||
      !restaurantName ||
      !city ||
      !address ||
      !contact
    ) {
      setError(true);
      return;
    } else {
      setError(false);
    }
    console.log(email);
    let response = await fetch("http://localhost:3000/api/restaurant", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        restaurantName,
        city,
        address,
        contact,
      }),
    });
    response = await response.json();
    console.log(response);
    if (response.success) {
      toast.success("Restaurant Registered Successfully!");
      console.log(response);
      const { result } = response;
      delete result.password;
      localStorage.setItem("RestaurantUser", JSON.stringify(result));
      router.push("/restaurant/dashboard");
    }
  };

  return (
    <div className="w-full max-w-4xl bg-white px-5">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Restaurant Sign Up
      </h1>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        <div>
          <label htmlFor="email" className="block text-sm text-gray-700 mb-1">
            Email address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
          {error && !email && (
            <span className="text-[12px] font-light text-red-500">
              "Missong fields"
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />{" "}
          {passwordError && (
            <span className="text-red-500 text-sm font-light">
              Password & Confirm Password Does not Match
            </span>
          )}
          {error && !password && (
            <span className="text-[12px] font-light text-red-500">
              "Missong fields"
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm text-gray-700 mb-1"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="••••••••"
            value={c_password}
            onChange={(e) => setC_password(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
          {passwordError && (
            <span className="text-red-500 text-sm font-light">
              Password & Confirm Password Does not Match
            </span>
          )}
          {error && !c_password && (
            <span className="text-[12px] font-light text-red-500">
              "Missong fields"
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor="restaurantName"
            className="block text-sm text-gray-700 mb-1"
          >
            Restaurant Name
          </label>
          <input
            type="text"
            id="restaurantName"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            placeholder="e.g., Bombay Bistro"
            className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
          {error && !restaurantName && (
            <span className="text-[12px] font-light text-red-500">
              "Missong fields"
            </span>
          )}
        </div>

        <div>
          <label htmlFor="city" className="block text-sm text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g., Mumbai"
            className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
          {error && !city && (
            <span className="text-[12px] font-light text-red-500">
              "Missong fields"
            </span>
          )}
        </div>

        <div>
          <label htmlFor="address" className="block text-sm text-gray-700 mb-1">
            Full Address
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Street, Area, Zip Code"
            className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
          {error && !address && (
            <span className="text-[12px] font-light text-red-500">
              "Missong fields"
            </span>
          )}
        </div>

        <div>
          <label htmlFor="contact" className="block text-sm text-gray-700 mb-1">
            Contact Number
          </label>
          <input
            type="text"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="e.g., 9876543210"
            className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
          {error && !contact && (
            <span className="text-[12px] font-light text-red-500">
              "Missong fields"
            </span>
          )}
        </div>
      </form>

      <button
        type="submit"
        className="w-full mt-8 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-medium transition duration-200"
        onClick={handleSignup}
      >
        Register
      </button>
    </div>
  );
};

export default RestaurantSignup;
