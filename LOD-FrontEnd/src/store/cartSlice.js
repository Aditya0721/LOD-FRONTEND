const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice(
    {
        name:'cart',
        initialState:{cart:[], cartWarning:false},
        reducers:{
            modifyCart(state, action){
                state.cart = action.payload
            },
            openCartWarning(state, action){
                state.cartWarning = true
            },
            closeCartWarning(state, action){
                state.cartWarning = false
            }
        }
    }
)

export const cartActions = cartSlice.actions
export default cartSlice