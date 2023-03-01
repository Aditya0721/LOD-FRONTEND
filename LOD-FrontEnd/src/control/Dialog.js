import { useState } from "react"
import { Dialog, DialogContent, IconButton } from "@mui/material"
import { useNavigate } from "react-router"
import Close from "@mui/icons-material/Close"
import { useDispatch, useSelector } from "react-redux"
import { dialogActions } from "../store/logInRegisterDialogSlice"

const CustomDialog = (props)=>{

    const open = useSelector(state=> state.dialog.isOpen)
    const dispatch = useDispatch()

    return(<>
        <Dialog open={open} onClose={()=>{dispatch(dialogActions.close())}} sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent:'center',
                alignContent:'center'}}>
            <DialogContent sx={{backgroundColor:"white", display:'flex',direction:'column', justifyContent:"end"}}>
                {props.children}
                <IconButton onClick={()=>{dispatch(dialogActions.close())}} sx={{ height:'5px'}}><Close color='error'></Close></IconButton></DialogContent>
        </Dialog>
    </>)
}

export default CustomDialog