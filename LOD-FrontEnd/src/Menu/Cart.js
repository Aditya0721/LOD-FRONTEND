import { Button, ButtonGroup, Card, CardContent, CardHeader, Paper, Typography } from "@mui/material";

import { useDebugValue, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { Stack } from "@mui/system";
import RemoveIcon from '@mui/icons-material/Remove';
import { cartActions } from "../store/cartSlice";
import axios from "axios";
import { updateCartUrl } from "../constants/url";
import EmptyCartWarning from "./EmptyCartWarning";

const Cart = (props)=>{

    const cart = useSelector(state=>state.cart.cart)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state=>state.auth.user)
    const [openWarning, setOpenWarning] = useState(false)

    useEffect(()=>{
        if(user){
            console.log(user, cart)
            axios.post(updateCartUrl,{cart},{headers:{
                "x-auth-token": user.token
            }}).then((res)=>console.log(res)).catch((err)=>console.log(err))
        }
    }, [cart, user])

    const addToCart = (product)=> { 
        console.log(cart);
        const pId = product.productId;
        const updatedCart = cart.map((ele) => {
            if (ele.product.productId === pId) {
                return { product: ele.product, quantity: ele.quantity + 1, shopId: ele.shopId };
            }
            else {
                console.log(ele)
                return ele;
            }
        });
        dispatch(cartActions.modifyCart(updatedCart));
    }

    const removeFromCart = (product)=>{
        const pId = product.productId;
        const updatedCart =  cart.map((ele) => {
            if (ele.product.productId === pId) {
                return { product: ele.product, quantity: ele.quantity - 1, shopId: ele.shopId };
            }
            else {
                return ele;
            }
        }); 
        dispatch(cartActions.modifyCart(updatedCart));
    }

    const emptyCart = ()=>{
        setOpenWarning(true)
    }

    return(
        <>
            <Paper elevation={4}>     
                    {cart.map((ele, index)=>{
                        return(<Card key={index} sx={{height:'200px', mb:'2px'}}>
                        <CardHeader
                            title={ele.product.productId}
                            draggable
                            sx={{height:'5px'}}
                            
                        />
                        <CardContent border={1} sx={{width:'100%'}}>
                            <Typography mb={1}>Price:</Typography>
                            <Typography mb={1}>brand:</Typography>
                            <Typography>type:</Typography>
                            <Stack direction='row'>
                                <Typography mt={1}>Quantiy:</Typography>
                                <Button color="success" onClick={()=>{addToCart(ele.product)}}><AddIcon></AddIcon></Button>
                                <Typography mt={1}>{ele.quantity}</Typography>
                                {ele.quantity>0 && <Button color='error' onClick={()=>{removeFromCart(ele.product)}}><RemoveIcon></RemoveIcon></Button>}
                            </Stack>
                        </CardContent>
                        </Card>
                            )
                    })}
                    {
                        cart.length>0 && 
                            <ButtonGroup variant="contained">
                            <Button color='success' onClick={()=>{
                                navigate("/order")
                            }}>
                                Place Order
                            </Button>
                            <Button color='error' onClick={()=>{
                                emptyCart()
                            }}>
                                Empty Cart
                            </Button>
                        </ButtonGroup>
                    } 
            </Paper>
            {openWarning && <EmptyCartWarning setOpenWarning={setOpenWarning}></EmptyCartWarning>}
        </>
    )
}

export default Cart;