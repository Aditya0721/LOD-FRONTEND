import { Backdrop, Button, ButtonGroup, Card, CardContent, CardHeader, Dialog, DialogActions, DialogContentText, DialogTitle, Grid, Paper, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import { Box, Container, Stack } from "@mui/system"
import axios from "axios"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { allShopUrl, closeRequestUrl, getShopRequestsUrl, updateShopStatusUrl } from "../constants/url"
import Shop from "../shops/Shop"
import { shopActions } from "../store/shop"

const ShopRequests = ()=>{
    const [requests, setRequests] = useState([])
    const [updateStatus, setUpdateStatus] = useState("PENDING")
    const [shopToBeUpdated, setShopToBeUpdated] = useState("")
    const [toggledData, setToggledData] = useState([])
    const [requestToBeUpdated, setRequestToBeUpdated] = useState("")
    const [alignment, setAlignment] = useState("OPEN")
    const [open, setOpen] = useState(false)
    const [viewShop, setViewShop] = useState(false)

    const user = useSelector(state=>state.auth.user)

    const dispatch = useDispatch()
    let result = []

    useEffect(()=>{
        axios.get(getShopRequestsUrl, {headers:{
            "x-auth-token":user.token
        }}).
        then((res)=>{result = res.data.map((req)=>{return{...req, viewShop:false}}); return result}).
        then((res)=>{console.log(result)
            setRequests(result)
            setToggledData(result.filter(req=>req.status==="OPEN"))}).
        catch((err)=>{console.log(err)})
    },[])

    const handleClose = ()=>{
        setOpen(false)
    }

    const handleToggle = (event)=>{
        setAlignment(event.target.value)
        const filterRequest = requests.filter((shop)=>{return shop.status===event.target.value})
        console.log(filterRequest)
        setToggledData(filterRequest)
    }

    const setCurrentViewShop = (index)=>{
        let data = [...toggledData]
        let currentReq = data[index]

        currentReq.viewShop = true

        data[index] = currentReq
        
        setToggledData(data)
    }
    const updateStausChange = async()=>{
        await axios.put(updateShopStatusUrl+shopToBeUpdated+"/"+updateStatus,{},{headers:{
            "x-auth-token":user.token
        }}).then((res)=>{axios.get(allShopUrl).
        then((res)=>{console.log(res.data); dispatch(shopActions.setShops(res.data))}).
        catch((err)=>{console.log(err)})})
        .catch((err)=>{console.log(err)})

        await axios.put(closeRequestUrl+requestToBeUpdated,{"action":updateStatus},{headers:{
            "x-auth-token":user.token
            }}).
        then((res)=>{
            axios.get(getShopRequestsUrl, {headers:{
            "x-auth-token":user.token
            }}).
            then((res)=>{result = res.data.map((req)=>{return{...req, viewShop:false}}); return result}).
            then((res)=>{console.log(res)
                setRequests(res)
                setToggledData(res.filter(req=>req.status==="OPEN"))}).
            catch((err)=>{console.log(err)})}).
        catch((err)=>{console.log(err)})
    }

    return(<>
        <Grid container>
            <Grid item xl={2} md={2} xs={2} sx={{display:'flex', justifyContent:'center', alignItems:'baseLine'}}>
                <Stack>
                    <Typography variant="h6" color="primary">Status</Typography>
                    <ToggleButtonGroup color="primary" value={alignment}>
                        <ToggleButton value="OPEN" onClick={(e)=>{handleToggle(e)}}>
                            OPEN
                        </ToggleButton>
                        <ToggleButton value="CLOSED" onClick={(e)=>{handleToggle(e)}}>
                            CLOSED
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Stack>
            </Grid>
            <Grid container item xl={10} md={10} xs={10} border={1}>
                {toggledData.length!==0?toggledData.map((request, index)=>{
                    return(
                        <Grid container item xl={12} key={index}>
                            <Grid item xl={3} md={3} xs={12} >
                                <Paper>
                                    <Card style={request.status==="CLOSED"?{opacity:0.4}:{}}>
                                        <CardHeader
                                            title={request.status==="CLOSED"?`Request ${request.action}`:'APPROVE REQUEST'}/>
                                        <CardContent>RequestId: {request.requestId}</CardContent>
                                        <CardContent>ShopId: {request.shopId}</CardContent>
                                        <CardContent>AdminId: {request.assignedTo}</CardContent>
                                        <CardContent>OpenedOn: {request.createdAt}</CardContent>
                                        {request.status==="CLOSED" && <CardContent>ClosedOn: {request.updatedAt}</CardContent>}
                                        {(request.status!=="CLOSED") && <ButtonGroup>
                                            <Button onClick={()=>{setUpdateStatus("APPROVED");setShopToBeUpdated(request.shopId);setRequestToBeUpdated(request.requestId); setOpen(true)}}>Approve</Button>
                                            <Button onClick={()=>{setUpdateStatus("REJECTED");setShopToBeUpdated(request.shopId);setRequestToBeUpdated(request.requestId); setOpen(true)}}>Reject</Button>
                                            <Button onClick={()=>{setCurrentViewShop(index)}}>View Shop</Button>
                                        </ButtonGroup>}
                                    </Card>
                                </Paper>
                            </Grid>
                        {(request.status!=="CLOSED")&&
                            <Grid item key={index} xl={9} md={9} xs={12}>
                                {(request.viewShop===true)&&
                                    <Shop shopId={request.shopId}></Shop>
                                }
                            </Grid>
                        }
                        </Grid>
                    )
                }):<h1>There Are No {alignment} Tickets</h1>}
            </Grid>
        
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