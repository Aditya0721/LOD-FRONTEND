import { useEffect } from "react"
import CustomDialog from "../control/Dialog"
import LogIn from "../SignIn/LogIn"
import { useDispatch, useSelector } from "react-redux"
import { authActions } from "../store/authSlice"
import useLogIn from "../control/CheckLogIn"
import jwtDecode from "jwt-decode"

const ProtectedComponent = ({children})=>{
    
    const dispatch = useDispatch()

    const isLoggedIn = useSelector(state=>state.auth.isLoggedIn)
    console.log(isLoggedIn)
    if(!isLoggedIn){
        return <CustomDialog><LogIn></LogIn></CustomDialog>
    }
    return children
}

export default ProtectedComponent