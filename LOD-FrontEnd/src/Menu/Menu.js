import { Button, Card, CardContent, CardHeader, CardMedia, Divider, Grid, Paper, Typography } from "@mui/material"
import { Box, Stack } from "@mui/system"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import AddProduct from "../shopOwner/AddProduct"
import img from "../static/bottle-1.jpg"
import { shopActions } from "../store/shop"

const Menu = ()=>{
    const params = useParams()
    const shopId = params.shopId
    const user = useSelector(state=>state.auth.user)

    const [cart, setCart] = useState([])

    const [totalPrice, setTotalPrice] = useState([])

    const [showAddProduct, setShowAddProduct] = useState(false)

    const shop = useSelector(state=>state.shops.currentShop)

    useEffect(()=>{
        console.log(shop)
    },[])
    
    const addToCart = (product)=>{
        console.log(cart)
        const pId = product.productId

        if(!cart.map((ele)=>{return ele.product.productId}).includes(pId)){
            setCart([...cart,{product:product, quantity:1}])
            console.log(cart)
        }
        else{
            const updatedCart = cart.map((ele)=>{
                if(ele.product.productId===pId){
                    return {product:ele.product, quantity:ele.quantity+1}
                }
                else{
                    return ele
                }
            })
            setCart(updatedCart)
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
                <Grid item xl={2} sx={{height:'50vh',overflow:'auto'}}>
                    <Paper elevation={4}>
                        BASKET
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
                    </Paper>
                    
                </Grid>
            </Grid>
        </Grid>
        {showAddProduct && <AddProduct showAddProduct={showAddProduct} setShowAddProduct={setShowAddProduct}></AddProduct>}
        </>
    )
}

export default Menu