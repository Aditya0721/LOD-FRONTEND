import { Card, CardContent, CardHeader, Typography, Button} from "@mui/material"
import { Box, Stack } from "@mui/system"
import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { shopActions } from "../store/shop"

const ShowShops = ()=>{
    
    const dispatch = useDispatch()

    useEffect(()=>{
        axios.get("http://localhost:8081/lod/shop/shops").
        then((res)=>{console.log(res.data); dispatch(shopActions.setShops(res.data))}).
        catch((err)=>{console.log(err)})  
    },[])
    
    const shops = useSelector(state=>state.shops.shops)

    return(<>
            <Box border={1} sx={{display:'flex', justifyContent:'start', alignItems:'baseline', alignContent:'flex-start'}}>
                <Stack border={1} spacing={2} sx={{margin:'2', display:"flex", justifyContent:"center", alignItems:"center"}}>
                    {shops.map((shop, index)=>{
                        return(
                            <Card key={index}>
                                <CardHeader title={shop.shopName}/>
                                <CardContent>
                                    <Typography>phoneNumber:{shop.phoneNumber}</Typography>
                                    <Typography>city:{shop.address.city}</Typography>
                                    <Typography>locality:{shop.address.locality}</Typography>
                                    <Typography>landMark:{shop.address.landMark}</Typography>
                                    <Typography>Rating:{shop.rating}</Typography>
                                    <Typography style={shop.isVerified==="REJECTED"?{color:"red"}:{color:"green"}}>{shop.isVerified}</Typography>
                                    <Link to={`/menu/${shop.shopId}`}><Button onClick={()=>{dispatch(shopActions.setCurrentShop(shop))}}>Menu</Button></Link>
                                </CardContent>
                            </Card>
                        )
                    })}
                </Stack>
            </Box>
        </>)
}

export default ShowShops