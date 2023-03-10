import { Card, CardContent, CardHeader, Typography, Button, CardMedia, Grid} from "@mui/material"
import { Box, Stack } from "@mui/system"
import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { shopActions } from "../store/shop"
import shopImg from "../static/shop_1.jpg"

const ShowShops = ()=>{
    
    const dispatch = useDispatch()

    useEffect(()=>{
        axios.get().
        then((res)=>{console.log(res.data); dispatch(shopActions.setShops(res.data))}).
        catch((err)=>{console.log(err)})  
    },[])
    
    const shops = useSelector(state=>state.shops.shops)

    return(<>
            <Grid item xl={9} sx={{display:'flex', justifyContent:'start', alignItems:'baseline', alignContent:'flex-start',}}>
                <Stack spacing={2} sx={{margin:'2', display:"flex", justifyContent:"center", alignItems:"center", width:'100%'}}>
                    {shops.map((shop, index)=>{
                        return(
                            <Card key={index} sx={{width:'80%'}}>
                                <CardHeader title={shop.shopName}/>
                                <Stack direction='row' spacing={3}>
                                    <CardMedia
                                        component="img"
                                        height='200'
                                        image={shopImg}
                                        alt="No Image"
                                        sx={{width:'30%'}}
                                        ></CardMedia>
                                    <CardContent>
                                        <Typography fontFamily='monospace' color='chocolate'>phoneNumber:{shop.phoneNumber}</Typography>
                                        <Typography fontFamily='monospace' color='chocolate'>city:{shop.address.city}</Typography>
                                        <Typography fontFamily='monospace' color='chocolate'>locality:{shop.address.locality}</Typography>
                                        <Typography fontFamily='monospace' color='chocolate'>landMark:{shop.address.landMark}</Typography>
                                        <Typography fontFamily='monospace' color='chocolate'>Rating:{shop.rating}</Typography>
                                        <Link to={`/menu/${shop.shopId}`}><Button variant='contained' color='success' onClick={()=>{dispatch(shopActions.setCurrentShop(shop))}}>Menu</Button></Link>
                                    </CardContent>
                                </Stack>
                            </Card>
                        )
                    })}
                </Stack>
            </Grid>
        </>)
}

export default ShowShops