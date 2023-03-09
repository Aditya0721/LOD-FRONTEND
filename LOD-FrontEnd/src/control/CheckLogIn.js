import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { authActions } from "../store/authSlice"
import jwtDecode from "jwt-decode"

const CheckLogIn = ()=>{
    const dispatch = useDispatch()
    console.log(localStorage.getItem("token"))
    if(localStorage.getItem("token")!==null){
        const decoded = jwtDecode(localStorage.getItem("token"), 'SECRET SALT')
        const user = decoded._doc
        user.token = localStorage.getItem("token")
        dispatch(authActions.setUser(user))
        dispatch(authActions.logIn())
    }
}

export default CheckLogIn