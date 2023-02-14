import { Card, CardContent, CardHeader, Typography, Button} from "@mui/material"
import { Box, Stack } from "@mui/system"
import axios from "axios"
import { useEffect, useState } from "react"

const ShowShops = ()=>{

    const [shops, setShops] = useState([])

    useEffect(()=>{
        axios.get("http://localhost:8081/lod/shop/shops").
        then((res)=>{console.log(res.data); setShops(res.data)}).
        catch((err)=>{console.log(err)})  
    },[])

    return(<>
            <Box border={1} sx={{display:'flex', justifyContent:'start', alignItems:'baseline', alignContent:'flex-start'}}>
                <Stack border={1} spacing={2} sx={{margin:'2', display:"flex", justifyContent:"center", alignItems:"center"}}>
                    {shops.map((shop, index)=>{
                        return(
                            <Card key={index}>
                                <CardHeader title={shop.shopName}/>
                                <CardContent>
                                    <Typography>{shop.phoneNumber}</Typography>
                                    <Typography>{shop.address.city}</Typography>
                                    <Typography>{shop.address.locality}</Typography>
                                    <Typography>{shop.address.landMark}</Typography>
                                    <Typography>{shop.rating}</Typography>
                                    <Button>Menu</Button>
                                </CardContent>
                            </Card>
                        )
                    })}
                </Stack>
            </Box>
        </>)
}

export default ShowShops