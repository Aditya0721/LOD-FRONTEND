import { Button, Card, CardContent, CardHeader, Paper, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Cart = (props)=>{

    const cart = useSelector(state=>state.cart.cart)
    const navigate = useNavigate()

    return(
        <>
            <Paper elevation={4}>     
                    {cart.map((ele, index)=>{
                        return(<Card key={index} sx={{height:'150px'}}>
                        <CardHeader
                            title={ele.product.productId}
                            draggable
                            sx={{height:'5px'}}
                        />
                        <CardContent border={1} sx={{width:'100%'}}>
                            <Typography>Price:</Typography>
                            <Typography>brand:</Typography>
                            <Typography>type:</Typography>
                            <Typography>Quantiy:{ele.quantity}</Typography>
                        </CardContent>
                        </Card>
                            )
                    })}
                    <Button onClick={()=>{
                        navigate("/order")
                    }}>
                        Place Order
                    </Button>
            </Paper>
          
        </>
    )
}

export default Cart;