import { createSlice } from "@reduxjs/toolkit";

const shopRequestSlice = createSlice({
    name:"shopRequests",
    initialState:{requests:[]},
    reducers:{
        addRequests:(state, payload)=>{
            state.requests.push(payload)
        }
    }
})

export const shopRequestsActions = shopRequestSlice.actions

export default shopRequestSlice