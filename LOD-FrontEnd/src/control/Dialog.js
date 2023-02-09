import { useState } from "react"
import { Dialog, DialogContent, IconButton } from "@mui/material"
import { useNavigate } from "react-router"
import Close from "@mui/icons-material/Close"

const CustomDialog = (props)=>{

    return(<>
        <Dialog open={props.open} onClose={props.handleClose} sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent:'center',
                alignContent:'center'}}>
            <DialogContent sx={{backgroundColor:"black", display:'flex',direction:'column', justifyContent:"end"}}>
                {props.children}
                <IconButton onClick={()=>{props.handleClose()}} sx={{ height:'5px'}}><Close color='error'></Close></IconButton></DialogContent>
        </Dialog>
    </>)
}

export default CustomDialog