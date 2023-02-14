import { createSlice } from "@reduxjs/toolkit";

const logInRegisterDialogSlice = createSlice({
        name: "isDialogOpen",
        initialState: {isOpen:false, view:""},
        reducers:{
            open(state, action){
                state.isOpen = true
            },
            close(state, action){
                state.isOpen = false
            },
            logInView(state, action){
                state.view = "Login"
            },
            registerView(state, action){
                state.view = "Register"
            }
        }
    }
)

export const dialogActions = logInRegisterDialogSlice.actions

export default logInRegisterDialogSlice