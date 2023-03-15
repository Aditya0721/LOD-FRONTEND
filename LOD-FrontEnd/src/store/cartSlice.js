const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice(
    {
        name:'cart',
        initialState:{cart:[]},
        reducers:{
            modifyCart(state, action){
                state.cart = action.payload
            }
        }
    }
)

export const cartActions = cartSlice.actions
export default cartSlice