import { useState } from "react"
import { Dialog, DialogContent, IconButton } from "@mui/material"
import { useNavigate } from "react-router"
import Close from "@mui/icons-material/Close"

const CustomDialog = ({children})=>{
    
    const [open, setOpen] = useState(true)
    const navigate = useNavigate()

    const handleClose = ()=>{
        setOpen(false)
        navigate(-1)
    }

    return(<>
        <Dialog open={open} onClose={handleClose} sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent:'center',
                alignContent:'center'}}>
            <DialogContent sx={{backgroundColor:"white", display:'flex',direction:'column', justifyContent:"end"}}>
                {children}
                <IconButton onClick={handleClose} sx={{ height:'5px'}}><Close color='error'></Close></IconButton></DialogContent>
        </Dialog>
    </>)
}

export default CustomDialog