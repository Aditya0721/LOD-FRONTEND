import { Card, CardContent, CardMedia, Typography } from "@mui/material"
import { Stack } from "@mui/system"
import { useSelector } from "react-redux"
import shopImg from "../static/shop_1.jpg"

const Shop = (props)=>{

    const shops = useSelector(state=>state.shops.shops)

    const shop = shops.find(shop=>shop.shopId===props.shopId) 
    
    return(<Card sx={{display:'flex',justifyContent:'left', alignItems:'left'}}>
            <CardMedia 
            component="img"
            height='400'
            image={shopImg}
            alt="No Image"
            sx={{width:'40%'}}
            >
            </CardMedia>
            <CardContent>
                <Typography variant="h1">{shop.shopName}</Typography>
                <Typography>phoneNumber:{shop.phoneNumber}</Typography>
                <Typography>city:{shop.address.city}</Typography>
                <Typography>locality:{shop.address.locality}</Typography>
                <Typography>landMark:{shop.address.landMark}</Typography>
                <Typography>Rating:{shop.rating}</Typography>
                <Typography style={shop.isVerified==="REJECTED"?{color:"red"}:{color:"green"}}>{shop.isVerified}</Typography>
            </CardContent>
    </Card>)    
}

export default Shop