import { useDispatch, useSelector } from "react-redux"
import CustomDialog from "../control/Dialog"
import useLogIn from "../control/CheckLogIn"
import LogIn from "../SignIn/LogIn"
import { dialogActions } from "../store/logInRegisterDialogSlice"

const OnlyAdmin = ({children})=>{
    
    const user = useSelector(state=>state.auth.user)
    const isLoggedIn = useSelector(state=>state.auth.isLoggedIn)
    const dispatch = useDispatch()

    console.log("inOnlyadmin", isLoggedIn)
    if(!isLoggedIn){
        dispatch(dialogActions.logInView())
        dispatch(dialogActions.open())
        return <CustomDialog><LogIn></LogIn></CustomDialog>
    }
    else{
        if(user.role=="ADMIN"){
            return children
        }
        else{
            return <h1>Not Authorized</h1>
        }
    }
}

export default OnlyAdmin