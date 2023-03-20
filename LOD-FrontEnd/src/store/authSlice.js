import {createSlice} from '@reduxjs/toolkit'

const authSlice = createSlice({
    name:'isLoggedIn',
    initialState:{isLoggedIn:false, user:null},
    reducers:{
        logIn(state, action){
            state.isLoggedIn = true
        },
        logOut(state, action){
            state.isLoggedIn = false
        },
        setUser(state, action){
            state.user = action.payload
        }
    }
})

export const authActions = authSlice.actions

export default authSlice