import { Typography } from "@mui/material"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { allShopUrl } from "../constants/url"
import ShowShops from "../shops/ShowShops"
import { shopActions } from "../store/shop"

const Home = () => {
    const shopRequests = useSelector(state=>state.shopRequests.requests)
    
    const dispatch = useDispatch()

    useEffect(()=>{
        axios.get(allShopUrl).
        then((res)=>{console.log(res.data); dispatch(shopActions.setShops(res.data))}).
        catch((err)=>{console.log(err)})  
    },[])

    useEffect(()=>{
        console.log(shopRequests)
    },[])
    return(
        <>
            LOD
        </>
    )
}

export default Home