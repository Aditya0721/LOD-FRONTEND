import { useDispatch, useSelector } from "react-redux"
import CustomDialog from "../control/Dialog"
import LogIn from "../SignIn/LogIn"
import { dialogActions } from "../store/logInRegisterDialogSlice"

const OnlyShopKeeper = ({children})=>{

    const user = useSelector(state=>state.auth.user)
    const isLoggedIn = useSelector(state=>state.auth.isLoggedIn)
    const dispatch = useDispatch()

    if(!isLoggedIn){
        dispatch(dialogActions.logInView())
        dispatch(dialogActions.open())
        return <CustomDialog><LogIn></LogIn></CustomDialog>
    }
    else{
        if(user.role=="Shop Keeper"){
            return children
        }
        else{
            return <h1>Not Authorized</h1>
        }
    }
}

export default OnlyShopKeeper