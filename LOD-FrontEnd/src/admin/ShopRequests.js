import { Backdrop, Button, Card, CardContent, CardHeader, Dialog, DialogActions, DialogContentText, DialogTitle, Grid, Paper, Typography } from "@mui/material"
import { Box, Container, Stack } from "@mui/system"
import axios from "axios"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

const ShopRequests = ()=>{
    const [requests, setRequests] = useState([])
    const [updateStatus, setUpdateStatus] = useState("PENDING")
    const [shopToBeUpdated, setShopToBeUpdated] = useState("")

    const [requestToBeUpdated, setRequestToBeUpdated] = useState("")

    const [open, setOpen] = useState(false)

    const user = useSelector(state=>state.auth.user)

    useEffect(()=>{
        axios.get("http://localhost:8081/lod/admin/fetchRequests", {headers:{
            "x-auth-token":user.token
        }}).
        then((res)=>{setRequests(res.data)}).
        catch((err)=>{console.log(err)})
    },[])

    const handleClose = ()=>{
        setOpen(false)
    }

    const updateStausChange = async()=>{
        await axios.put(`http://localhost:8081/lod/shop/updateStatus/${shopToBeUpdated+"/"+updateStatus}`,{},{headers:{
            "x-auth-token":user.token
        }}).then((res)=>{console.log(res.data)})
        .catch((err)=>{console.log(err)})

        await axios.put("http://localhost:8081/lod/admin/closeRequest/"+requestToBeUpdated,{},{headers:{
            "x-auth-token":user.token
            }}).
        then((res)=>{
            axios.get("http://localhost:8081/lod/admin/fetchRequests", {headers:{
            "x-auth-token":user.token
            }}).
            then((res)=>{setRequests(res.data)}).
            catch((err)=>{console.log(err)})}).
        catch((err)=>{console.log(err)})
    }

    return(<>
        <Grid container>
        {requests.map((request, index)=>{
                return(
                <>
                <Grid item xl={12} key={index} xs={12}>
                    <Paper key={index}>
                        <Card style={request.status==="CLOSED"?{opacity:0.4}:{}}>
                            <CardHeader
                                title="Approve Request"/>
                            <CardContent>ShopId: {request.shopId}</CardContent>
                            <CardContent>AdminId: {request.assignedTo}</CardContent>
                            <CardContent>RequestId: {request.requestId}</CardContent>
                            {/* <CardContent>{request.address.city}</CardContent>
                            <CardContent>{request.address.locality}</CardContent>
                            <CardContent>{request.address.landMark}</CardContent> */}
                            {request.status!=="CLOSED" && <>
                                <Button onClick={()=>{setUpdateStatus("APPROVED");setShopToBeUpdated(request.shopId);setRequestToBeUpdated(request.requestId); setOpen(true)}}>Approve</Button>
                                <Button onClick={()=>{setUpdateStatus("REJECTED");setShopToBeUpdated(request.shopId);setRequestToBeUpdated(request.requestId); setOpen(true)}}>Reject</Button>
                            </>}
                        </Card>
                    </Paper>
                </Grid>
                </>
                )
            })}
            <Backdrop open={open} onClick={handleClose} sx={{color: 'white',  zIndex: (theme) => theme.zIndex.drawer + 1}}>
                            <Stack direction='column' spacing={1}>
                                <Typography variant='h3'>
                                    Are You Sure ?
                                </Typography>
                                <Typography variant='h6'>
                                    The Shop Request Will Be {updateStatus}
                                </Typography>
                                <Button onClick={handleClose} color="error" variant="contained">Disagree</Button>
                                <Button onClick={()=>{updateStausChange();handleClose()}} autoFocus variant="contained" color="success">
                                    Agree
                                </Button>
                            </Stack>   
                    </Backdrop>
        </Grid>
    </>)
}

export default ShopRequests