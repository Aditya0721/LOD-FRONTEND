import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice'
import cartSlice from './cartSlice'
import logInRegisterDialogSlice from './logInRegisterDialogSlice'
import shopSlice from './shop'
import shopRequestSlice from './shopRequestSlice'

const store = configureStore({
    reducer:
    {
        auth:authSlice.reducer,
        dialog:logInRegisterDialogSlice.reducer,
        shopRequests:shopRequestSlice.reducer,
        shops:shopSlice.reducer,
        cart:cartSlice.reducer,
    }
})

export default store