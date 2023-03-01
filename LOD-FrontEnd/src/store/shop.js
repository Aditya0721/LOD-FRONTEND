import { createSlice } from "@reduxjs/toolkit";

const shopSlice = createSlice({
    name:'shop',
    initialState:{shops:[]},
    reducers:{
        setShops:(state, action)=>{
            state.shops = action.payload
        },
        addShop:(state, action)=>{
            state.shops = [...state.shops, action.payload]
        }
    }
})

export const shopActions = shopSlice.actions

export default shopSlice