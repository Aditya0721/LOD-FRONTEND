import { useState } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cartSlice";

const { Backdrop, Typography, Stack, Button } = require("@mui/material")

const EmptyCartWarning = (props)=>{
    
    const dispatch = useDispatch()

    const [open, setOpen] = useState(true);

    const handleClose = ()=>{
        setOpen(false)
        props.setOpenWarning(false)
    }

    return(<Backdrop open={open} onClick={handleClose} sx={{color: 'white',  zIndex: (theme) => theme.zIndex.drawer + 1}}>
            <Stack direction='column' spacing={1}>
                <Typography variant='h3'>
                    Previous Cart Will Be Discarded !!!!
                </Typography>
                <Button onClick={handleClose} color="success" variant="contained">Go Back</Button>
                <Button onClick={()=>{dispatch(cartActions.modifyCart([]))}} autoFocus variant="contained" color="error">
                    Discard
                </Button>
            </Stack>   
    </Backdrop>)
}

export default EmptyCartWarning