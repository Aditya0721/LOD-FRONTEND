import { useEffect } from "react"
import CustomDialog from "../control/Dialog"
import LogIn from "../SignIn/LogIn"
import { useSelector } from "react-redux"

const ProtectedComponent = ({children})=>{
    const isLoggedIn = useSelector(state=>state.auth.isLoggedIn)
    console.log(isLoggedIn)
    if(!isLoggedIn){
        return <CustomDialog><LogIn></LogIn></CustomDialog>
    }
    return children
}

export default ProtectedComponent