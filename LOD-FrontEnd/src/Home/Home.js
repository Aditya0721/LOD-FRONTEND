import { Typography } from "@mui/material"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import ShowShops from "../shops/ShowShops"

const Home = () => {
    const shopRequests = useSelector(state=>state.shopRequests.requests)
    
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