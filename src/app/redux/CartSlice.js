
import { createSlice, current } from "@reduxjs/toolkit"

const initialState ={
    items:[],
    totalPrice:0,
    totalQuantity:0
}

const cartSlice= createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            const item= action?.payload
            
            const existingItem= state.items.find((i)=>i?._id===item._id);
           

            if(existingItem){
                existingItem.qty +=1;
            }else{
                state.items.push({...item,qty:1});
            }
            state.totalQuantity+=1;
            state.totalPrice+=item.price;
            let userdata = JSON.stringify(current(state.items));
            localStorage.setItem('CartData',userdata)
        },

        removeFromCart:(state,action)=>{
            const id= action.payload
            const item = state.items.find((i)=>i.id===id);
            if(item){
                state.totalQuantity -= item.quantity;
        state.totalPrice -= item.price * item.quantity;
        state.items = state.items.filter(i => i.id !== id);
            }
            let userdata = JSON.stringify(current(state.items));
            localStorage.setItem('CartData',userdata)
        },
        increaseQuantity:(state,action)=>{
            const item = state.items.find(i => i.id === action.payload);
      if (item) {
        item.quantity += 1;
        state.totalQuantity += 1;
        state.totalPrice += item.price;
      }
        },
        decreaseQuantity:(state,action)=>{
            const item = state.items.find(i => i.id === action.payload);
      if (item) {
        item.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalPrice -= item.price;
      }
        },
        clearCart:(state)=>{
            state.items=[],
            state.totalPrice=0,
            state.totalQuantity=0
             let userdata = JSON.stringify(current(state.items));
            localStorage.setItem('CartData',userdata)
        },
    }

})

export const { addToCart,removeFromCart,clearCart,increaseQuantity,decreaseQuantity}= cartSlice.actions

export default cartSlice.reducer