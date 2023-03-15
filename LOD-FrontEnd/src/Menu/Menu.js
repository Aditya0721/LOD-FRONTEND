import { Backdrop, Button, Card, CardContent, CardHeader, CardMedia, Divider, Grid, Paper, Typography } from "@mui/material"
import { Box, Stack } from "@mui/system"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import AddProduct from "../shopOwner/AddProduct"
import img from "../static/bottle-1.jpg"
import { cartActions } from "../store/cartSlice"
import { shopActions } from "../store/shop"
import Cart from "./Cart"

const Menu = ()=>{
    const params = useParams()
    const dispatch = useDispatch()

    const shopId = params.shopId

    const user = useSelector(state=>state.auth.user)

    const cart = useSelector(state=> state.cart.cart)

    const [totalPrice, setTotalPrice] = useState([])

    const [showAddProduct, setShowAddProduct] = useState(false)

    const shop = useSelector(state=>state.shops.currentShop)

    const [showCart, setShowCart] = useState(false)

    const [open, setOpen] = useState(false);

    useEffect(()=>{
        console.log()
        if(cart.length!==0){
            console.log(cart[0])
            if(cart[0].shopId===shopId){
                setShowCart(true)
            }
        }
        else{
            setShowCart(true)
        }
    },[cart])
    
    const handleClose = ()=>{
        setOpen(false)
    }
    const checkShop = ()=>{
        if(cart.length!==0 && cart[0].shopId!==shopId){
            setOpen(true)
            return false
        }
        return true
    }
    const addToCart = (product)=>{
        if(checkShop(product)){
            console.log(cart)
            const pId = product.productId

            if(!cart.map((ele)=>{return ele.product.productId}).includes(pId)){
                dispatch(cartActions.modifyCart([...cart,{product:product, quantity:1, shopId:shopId}]))
                console.log(cart)
            }
            else{
                const updatedCart = cart.map((ele)=>{
                    if(ele.product.productId===pId){
                        return {product:ele.product, quantity:ele.quantity+1, shopId:shopId}
                    }
                    else{
                        return ele
                    }
                })
                dispatch(cartActions.modifyCart(updatedCart))
            }
        }
        
    }
    return(
        <>
        <Grid item container xl={12} sx={{display:'flex', justifyContent:'flex-start'}}>
            <Grid item xl={12} border={1} sx={{height:'200px', display:'flex', justifyContent:'center', alignItems:'center', backgroundColor:'black'}}>
                <Card sx={{backgroundColor:'white'}}>
                    <CardHeader
                        title={shop.shopName}
                    />
                    <CardContent>
                        {shop.phoneNumber}
                        {shop.address.landMark}
                    </CardContent>
                </Card>
            </Grid>
            <Grid item container xl={12} border={1} sx={{height:'200vh', overflow:'hidden'}}> 
                <Grid item border={1} xl={2} sx={{display:'flex', justifyContent:'right', alignItem:'right'}}>
                    <Stack sx={{display:'flex', justifyContent:'right', alignContent:'space-around'}}>
                        <Typography>Best Seller</Typography>
                        <Typography>Best Seller</Typography>
                        <Typography>Best Seller</Typography>
                        <Typography>Best Seller</Typography>
                        <Typography>Best Seller</Typography>
                    </Stack>
                </Grid>
                <Grid item xl={8} border={1} sx={{maxHeight:'200vh', overflow:'auto', display:'flex', justifyContent:'center', alignItems:'baseLine'}}>
                    <Stack direction='column' sx={{width:'80%', display:'flex', justifyContent:'center', alignItems:'baseLine'}}
                        
                        spacing={2}
                    >
                        <Box sx={{width:'80%'}}>
                            <CardHeader
                                title="MENU"
                                sx={{display:'flex', justifyContent:'center', alignContent:'baseLine'}}
                            />
                            <CardContent>
                                <Stack sx={{display:'flex', justifyContent:'space-around'}} divider={<Divider orientation="horizontal" sx={{ borderBottomWidth: 3 }} flexItem />} spacing={2} >
                                    {shop.menu.map((product,index)=>
                                        (<Card key={index} sx={{height:'250px'}}>
                                                    <CardHeader
                                                        title={product.productName}
                                                    />
                                                    <Stack direction='row' paddingBottom={5}>
                                                        <CardContent border={1} sx={{width:'70%'}}>
                                                            <Typography>Price:{product.price}</Typography>
                                                            <Typography>Quantiy:{product.quantity}</Typography>
                                                            <Typography>brand:{product.brand}</Typography>
                                                            <Typography>type:{product.type}</Typography>
                                                        </CardContent>
                                                        <Stack direction='column' sx={{width:'20%'}}>
                                                            <CardMedia component="img" image={img} />
                                                            <Button variant='contained' color='success' onClick={()=>{addToCart(product)}}>ADD</Button>
                                                        </Stack>
                                                    </Stack>      
                                                </Card>
                                        )
                                    )}
                                    
                                </Stack>
                            </CardContent>
                        </Box>
                    </Stack>
                </Grid>
                {/* Basket */}
                <Grid item xl={2} sx={{height:'50vh',overflow:'auto'}}>
                    {showCart && <Cart></Cart>}
                </Grid>
            </Grid>
            <Backdrop open={open} onClick={handleClose} sx={{color: 'white',  zIndex: (theme) => theme.zIndex.drawer + 1}}>
                    <Stack direction='column' spacing={1}>
                        <Typography variant='h3'>
                            Previous Cart Will Be Discarded !!!!
                        </Typography>
                        <Button onClick={handleClose} color="success" variant="contained">Go Back</Button>
                        <Button onClick={()=>{dispatch(cartActions.modifyCart([]))}} autoFocus variant="contained" color="error">
                            Discard
                        </Button>
                    </Stack>   
            </Backdrop>
        </Grid>

        {showAddProduct && <AddProduct showAddProduct={showAddProduct} setShowAddProduct={setShowAddProduct}></AddProduct>}
        </>
    )
}

export default Menu