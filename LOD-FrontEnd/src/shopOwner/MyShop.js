import { Card, CardContent, CardHeader, Typography, Button} from "@mui/material"
import { Box, Stack } from "@mui/system"
import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { getUsersShop } from "../constants/url"
import { shopActions } from "../store/shop"

const MyShop = ()=>{
    
    const dispatch = useDispatch()

    const params = useParams()
    useEffect(()=>{
        // get the users shop
        axios.get(getUsersShop+params.userId).
        then((res)=>{console.log(res.data); dispatch(shopActions.setMyShops(res.data))}).
        catch((err)=>{console.log(err)})  
    },[])
    
    const shops = useSelector(state=>state.shops.myShops)

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
                                    <Link to={`/editMenu/${shop.shopId}`}><Button variant="contained" onClick={()=>{dispatch(shopActions.setCurrentShop(shop))}}>Edit Menu</Button></Link>
                                </CardContent>
                            </Card>
                        )
                    })}
                </Stack>
            </Box>
        </>)
}

export default MyShop