import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import CustomDialog from "../control/Dialog"
import CheckLogIn from "../control/CheckLogIn"
import useLogIn from "../control/CheckLogIn"
import LogIn from "../SignIn/LogIn"
import { dialogActions } from "../store/logInRegisterDialogSlice"
import jwtDecode from "jwt-decode"
import { authActions } from "../store/authSlice"

const OnlyShopKeeper = ({children})=>{
    
    const user = useSelector(state=>state.auth.user)
    const isLoggedIn = useSelector(state=>state.auth.isLoggedIn)
    const dispatch = useDispatch()

    if(!isLoggedIn){
        console.log("called")
        dispatch(dialogActions.logInView())
        dispatch(dialogActions.open())
        return <CustomDialog><LogIn></LogIn></CustomDialog>
    }
    else{
        console.log("fine")
        if(user.role=="SHOP KEEPER"){
            return children
        }
        else{
            return <h1>Not Authorized</h1>
        }
    }
}

export default OnlyShopKeeper