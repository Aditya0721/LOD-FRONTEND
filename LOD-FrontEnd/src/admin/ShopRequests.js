import { Button, Card, CardContent, CardHeader } from "@mui/material"
import { useEffect } from "react"
import { useSelector } from "react-redux"

const ShopRequests = ()=>{
    const requests = useSelector(state=>state.shopRequests.requests)

    useEffect(()=>{
        console.log(requests)
    },[])

    return(<>
        {requests.map((request, index)=>{
            return(<Card key={index}>
                    <CardHeader
                        title="Approve Request"/>
                    <CardContent>{request.shopName}</CardContent>
                    <CardContent>{request.phoneNumber}</CardContent>
                    <CardContent>{request.address.state}</CardContent>
                    <CardContent>{request.address.city}</CardContent>
                    <CardContent>{request.address.locality}</CardContent>
                    <CardContent>{request.address.landMark}</CardContent>
                    <Button>Approve</Button>
                    <Button>Reject</Button>
            </Card>)
        })}
            
    </>)
}

export default ShopRequests