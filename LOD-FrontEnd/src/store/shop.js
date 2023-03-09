import { createSlice } from "@reduxjs/toolkit";

const shopSlice = createSlice({
    name:'shop',
    initialState:{shops:[], currentShop:{}, myShops:[]},
    reducers:{
        setShops:(state, action)=>{
            state.shops = action.payload
        },
        addShop:(state, action)=>{
            state.shops = [...state.shops, action.payload]
        },
        setCurrentShop:(state, action)=>{
            state.currentShop = {...action.payload}
        },
        addProductToMenu:(state, action)=>{
            state.currentShop = {...state.currentShop,["menu"]:[...state.currentShop.menu, action.payload]}
        },
        updateMenu:(state, action)=>{
            state.currentShop = {...state.currentShop,["menu"]:action.payload}
        },
        setMyShops:(state, action)=>{
            state.myShops = action.payload
        }
    }
})

export const shopActions = shopSlice.actions

export default shopSlice