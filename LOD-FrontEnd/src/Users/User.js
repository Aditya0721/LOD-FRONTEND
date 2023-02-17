import { Avatar, Card, CardContent, CardHeader, CardMedia, Typography } from "@mui/material"
import { Box, Stack } from "@mui/system"
import axios from "axios"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import useFetch from "../customHooks/useFetch"
import testImg from "../static/test_image-1.png"

const User = ()=>{

    const url = "http://localhost:8081/lod/admin/users"

    const user = useSelector(state=>state.auth.user)
    //console.log(useFetch(url))

    const [userList, setUserList] = useState([])

    useEffect(()=>{
        axios.get(url,{headers:{
            "x-auth-token":user.token
        }}).
        then((res)=>{setUserList(res.data)})
        .catch((err)=>{console.log(err.rersponse.error)})
    },[])

    const testSetUserList = ()=>{
        console.log("inside test function")
        setUserList(userList.slice(0, userList.length-1))
    }

    return (
        <>  
{/*             
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>address</th>
                        <th>userId</th>
                        <th>name</th>
                        <th>PhoneNumber</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {userList.map((user, index)=>{
                        return <tr key = {index}>
                                    <td>{user._id}</td>
                                    <td>{user.address.landMark+","+user.address.city+","+user.address.state}</td>
                                    <td>{user.userId}</td>
                                    <td>{user.firstName+user.lastName}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td>{user.email}</td>
                                </tr>
                    })}
                </tbody>
               
            </table>
            <button onClick={testSetUserList}>Remove Last Element</button> */}
            <Box sx={{width:'50%',display:'flex', justifyContent:"start", alignItems:'base'}}>
                <Stack direction='column' width="100%" spacing={3}>
                    {userList.map((user, index)=>{
                        return(<Card key={index} sx={{maxWidth:'345',alignContent:'baseline'}}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={testImg}
                                alt="No Image"
                                sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                                >
                            </CardMedia>
                            <CardHeader 
                                avatar={<Avatar sx={{ backgroundColor: 'orange' }}>{user.firstName[0].toUpperCase()}</Avatar>}
                                title={(user.firstName+" "+user.lastName).toUpperCase()}
                                subheader={user.role}
                            />
                            <CardContent>
                                <Typography variant='h6' fontFamily='sans-serif'>{user.phoneNumber}</Typography>
                                <Typography variant='h6'>{user.email}</Typography>
                                <Typography variant='h6'>{user.address.state}</Typography>
                                <Typography variant='h6'>{user.address.city}</Typography>
                            </CardContent>
                        </Card>)
                    })}
                </Stack>    
            </Box>
        </>
    )
}

export default User