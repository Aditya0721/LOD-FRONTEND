import {configureStore, createSlice} from '@reduxjs/toolkit'
import authSlice from './authSlice'
import logInRegisterDialogSlice from './logInRegisterDialogSlice'
import shopRequestSlice from './shopRequestSlice'

const store = configureStore({
    reducer:
    {
        auth:authSlice.reducer,
        dialog:logInRegisterDialogSlice.reducer,
        shopRequests:shopRequestSlice.reducer,
    }
})

export default store