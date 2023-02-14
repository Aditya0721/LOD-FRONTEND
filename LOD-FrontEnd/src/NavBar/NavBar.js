import {Dialog, Box, Button, AppBar, Grid, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, IconButton } from "@mui/material"
import { Container } from "@mui/system"
import { Link, Outlet, Routes, Route} from "react-router-dom"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Home from '../Home/Home';
import User from '../Users/User';
import Register from '../Register/Register';
import LogIn from '../SignIn/LogIn';
import CustomDialog from "../control/Dialog"
import image from "../static/hp-2.jpg"
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";
import { useState} from "react";
import { useNavigate } from "react-router-dom";
import { dialogActions } from "../store/logInRegisterDialogSlice";

const NavBar = ()=>{
    const pages = [["Users","/users"]]
    const view = useSelector(state=>state.dialog.view)
    const isLoggedIn = useSelector(state=>state.auth.isLoggedIn)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state=>state.auth.user)

    const logOut = ()=>{
        dispatch(dialogActions.close())
        dispatch(authActions.logOut())
        dispatch(authActions.setUser({}))
        navigate("/layout/home")
    }
    return(
        <>
            <AppBar position="static">
                        <Container maxWidth="xl">
                            <Toolbar>
                            <Link to="/layout/home">
                                <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                                    <Typography
                                            variant="h6"
                                            href="/home"
                                            sx={{
                                                mr:2,
                                                display:{xs:'none', md:'flex'},
                                                fontFamily: 'monospace',
                                                fontWeight: 700,
                                                letterSpacing: '.3rem',
                                                color: 'inherit',
                                            }}
                                    >
                                        LOD
                                    </Typography>
                                </Button>
                            </Link>
                                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                    {(isLoggedIn && user.role=="ADMIN") && <Link to='/users'><Button
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        USERS
                                    </Button></Link>}
                                    <Link to="/shops">
                                        <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                                                SHOPS
                                        </Button>
                                    </Link>
                                    {!isLoggedIn && <Button
                                        sx={{ my: 2, color: 'white', display: 'block' }} onClick={()=>{dispatch(dialogActions.registerView()); dispatch(dialogActions.open())}}
                                    >
                                        Register
                                    </Button>}
                                    {!isLoggedIn &&<Button
                                        sx={{ my: 2, color: 'white', display: 'block' }} onClick={()=>{dispatch(dialogActions.logInView()); dispatch(dialogActions.open())}}
                                    >
                                        LogIn
                                    </Button>}
                                </Box>
                                {isLoggedIn && 
                                <>
                                <Box sx={{alignContent:'end'}}>
                                        <Link to="/profile"><IconButton>
                                            <AccountCircleIcon fontSize="large"></AccountCircleIcon>
                                        </IconButton></Link>
                                </Box>
                                 <Box sx={{alignContent:'end'}}>
                                 <Button
                                        sx={{ my: 2, color: 'white', display: 'block' }} onClick={logOut}
                                    >
                                        LogOut
                                    </Button>
                         </Box></>}
                            </Toolbar>
                        </Container>    
                    </AppBar>
                    {view=="Login"&&
                        <CustomDialog><LogIn></LogIn></CustomDialog>}
                    {view=="Register"&&<CustomDialog><Register></Register></CustomDialog>
                        }
                    </>
            )
}

export default NavBar