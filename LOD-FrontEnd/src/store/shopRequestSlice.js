import { createSlice } from "@reduxjs/toolkit";

const shopRequestSlice = createSlice({
    name: "shopRequests",
    initialState:{requests:[]},
    reducers:{
        addRequests:(state, action)=>{
            state.requests = [...state.requests, action.payload]
        }
    }
})

export const shopRequestsActions = shopRequestSlice.actions

export default shopRequestSlice