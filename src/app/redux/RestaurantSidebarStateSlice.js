const { createSlice } = require("@reduxjs/toolkit")

const initialState ={
    restaurantSidebarActive:false,
}

const RestaurantSidebarStateSlice = createSlice({
    name:"State"
})