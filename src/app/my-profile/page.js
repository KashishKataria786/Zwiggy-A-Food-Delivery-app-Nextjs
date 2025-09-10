"use client";
import CustomerLayout from "@/app/_components/_layout/CustomerLayout";
import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import FoodImagesection from "@/app/_components/_ui/_customer_ui/FoodImagesection";
import MenuCard from "@/app/_components/_ui/_customer_ui/MenuCard";
import { AuthContext, useAuth } from "@/app/context/AuthContext";
import UserDataInCart from "../_components/_ui/_customer_ui/UserDataInCart";
import MyOrders from "../_components/_ui/_customer_ui/MyOrders";

const MyProfilePage = (props) => {
  const [restaurantDetails, setRestaurantDetails] = useState({});
  const [menu, setMenu] = useState([]);
  const [foodImages, setFoodImages] = useState([]);
  const [photosOpen, setPhotosOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const { user, loggedIn } = useContext(AuthContext);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");

  const loadRestaurantDetails = async () => {
    if (!id) return;
    setLoading(true);
    try {
      let response = await fetch(`http://localhost:3000/api/orders?id=${id}`);
      response = await response.json();

      setRestaurantDetails(response.result);
      setMenu(response.menu || []);
      setFoodImages(response.foodImages || []);

      console.log("API Response:", response);
    } catch (error) {
      console.error("Error fetching restaurant details:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRestaurantDetails();
  }, [id]);

  return (
    <CustomerLayout>
      <div className="w-[60vw] mx-auto px-1 py-9">
        <h1 className="text-4xl font-semibold">My Profile</h1>
        <div className="space-x-10 my-5">
          <button
            className={`py-4 px-6 border-b-4 text-xl font-semibold border-b-gray-200 ${
              !photosOpen ? "border-b-orange-400" : "text-gray-600"
            }`}
            onClick={() => setPhotosOpen(false)}
          >
           Profile {" "}
          </button>
          <button
            className={`py-4 px-6 border-b-4 text-xl font-semibold border-b-gray-200 ${
              photosOpen ? "border-b-orange-400" : "text-gray-600"
            }`}
            onClick={() => setPhotosOpen(true)}
          >
           Past Orders 
          </button>
          <hr className=" border-gray-300 rounded-full" />
        </div>
        {!photosOpen ? (
          <>
            <UserDataInCart />
          </>
        ) : (
          <div>
            {!loading && (
              <h1 className="text-xl font-semibold">{`${menu.length}  items in Menu`}</h1>
            )}
            <div>
           
              <MyOrders/>
            </div>
          </div>
        )}
      </div>
    </CustomerLayout>
  );
};

export default MyProfilePage;
