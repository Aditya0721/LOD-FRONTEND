import { Button, Card, CardContent, CardHeader, CardMedia, Divider, Grid, Paper, Typography } from "@mui/material"
import { Box, Stack } from "@mui/system"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import img from "../static/bottle-1.jpg"

const Menu = ()=>{
    const params = useParams()
    const shopId = params.shopId
    const shops = useSelector(state=>state.shops.shops)
    const user = useSelector(state=>state.auth.user)

    const [cart, setCart] = useState([])

    const [shop, setShop] = useState({menu:[], address:{}})

    const [menu, setMenu] = useState([])

    const [totalPrice, setTotalPrice] = useState([])

    useEffect(()=>{
        setShop(shops.find((shop)=>{return shop.shopId==shopId}))
    },[])

    useEffect(()=>{
        if(shop){
            console.log(shop)
            setMenu(shop.menu)
        }
    },[shop])

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
                    <Stack border={1} sx={{display:'flex', justifyContent:'right', alignContent:'space-around'}}>
                        <Typography>Best Seller</Typography>
                        <Typography>Best Seller</Typography>
                        <Typography>Best Seller</Typography>
                        <Typography>Best Seller</Typography>
                        <Typography>Best Seller</Typography>
                        {user.role==="SHOP KEEPER" &&
                            <Button>Add Item</Button>
                        }
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
                                    {menu.map((product,index)=>
                                        (<Card key={index} sx={{height:'250px'}}>
                                                    <CardHeader
                                                        title={product.productId}
                                                    />
                                                    <Stack direction='row' paddingBottom={5}>
                                                        <CardContent border={1} sx={{width:'70%'}}>
                                                            <Typography>Price</Typography>
                                                            <Typography>Quantiy:{product.quantity}</Typography>
                                                            <Typography>brand</Typography>
                                                            <Typography>type</Typography>
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
    )
}

export default Menu