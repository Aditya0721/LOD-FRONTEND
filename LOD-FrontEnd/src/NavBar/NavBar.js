import {Dialog, Box, Button, AppBar, Grid, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, IconButton, Stack, Menu, MenuItem } from "@mui/material"
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
import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { dialogActions } from "../store/logInRegisterDialogSlice";
import LiquorStoreIcon from "../Icon/LiquorStoreIcon";
import CheckLogIn from "../control/CheckLogIn";
import jwtDecode from "jwt-decode";
import { cartActions } from "../store/cartSlice";

const NavBar = ()=>{
    
    const pages = [["Users","/users"]]
    const view = useSelector(state=>state.dialog.view)
    const isLoggedIn = useSelector(state=>state.auth.isLoggedIn)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state=>state.auth.user)
    const [anchorEl, setAnchorEl] = useState(null);
    const [openMenu, setOpenMenu] = useState(Boolean(anchorEl));

    const logOut = ()=>{
        dispatch(dialogActions.close())
        dispatch(authActions.logOut())
        dispatch(authActions.setUser(null))
        dispatch(cartActions.modifyCart([]))
        localStorage.removeItem("token")
        navigate("/layout/home")
    }

    const handleOpenMenu = (event)=>{
        setAnchorEl(event.currentTarget)
        setOpenMenu(true)
    }
    const handleCloseMenu = ()=>{
        setAnchorEl(null)
        setOpenMenu(false)
    }

    return(
        <>
            <AppBar position="static">
                        <Container maxWidth="xl">
                            <Toolbar>
                                <Button id="basic-button" sx={{ my: 2, color: 'white', display: { xs: 'none', md: 'flex' } }} onClick={()=>{navigate("/layout/home")}}>
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
                             {/* for small screens */}
                             <Box sx={{display: { xs: 'flex', md: 'none' }}}>
                                <Button sx={{ m: 2, color: 'white'}} onClick={handleOpenMenu} >
                                        <Typography
                                                variant="h6"
                                                href="/home"
                                                sx={{
                                                    mr:2,
                                                    display:{md:'none', xl:'none'},
                                                    fontFamily: 'monospace',
                                                    fontWeight: 700,
                                                    letterSpacing: '.3rem',
                                                    color: 'inherit',
                                                }}
                                        >
                                            LOD
                                        </Typography>
                                    </Button>
                                <Menu id="basic-menu" anchorEl={anchorEl} open={openMenu} onClose={handleCloseMenu}>
                                        <MenuItem onClick={handleCloseMenu}>
                                            <Button onClick={()=>{navigate("/home")}} sx={{color: 'black', display: 'block' }}>
                                                    Home
                                            </Button>
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseMenu}>
                                            <Button onClick={()=>{navigate("/shops")}} sx={{color: 'black', display: 'block' }}>
                                                    SHOPS
                                            </Button>
                                        </MenuItem>
                                        {!isLoggedIn &&<MenuItem onClick={handleCloseMenu}>
                                            <Button
                                                sx={{color: 'black', display: 'block' }} onClick={()=>{dispatch(dialogActions.registerView()); dispatch(dialogActions.open())}}
                                                >
                                                Register
                                            </Button>
                                        </MenuItem> }
                                    {!isLoggedIn &&
                                    <MenuItem onClick={handleCloseMenu}>
                                         <Button
                                        sx={{color: 'black', display: 'block' }} onClick={()=>{dispatch(dialogActions.logInView()); dispatch(dialogActions.open())}}
                                    >
                                        LogIn
                                    </Button>
                                    </MenuItem>
                                   }
                                    {(isLoggedIn && user.role=="ADMIN") &&<><MenuItem onClick={handleCloseMenu} >
                                        <Button sx={{color: 'black', display: 'block' }} onClick={()=>{navigate("/users")}}>
                                            Users
                                        </Button>
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseMenu} >
                                    <Button sx={{color: 'black', display: 'block' }} onClick={()=>{navigate('/shopRequests')}}>
                                                    Shop Requests
                                            </Button>
                                    </MenuItem>
                                    </> }
                                    {(isLoggedIn && user.role==="SHOP KEEPER") &&<MenuItem onClick={handleCloseMenu}>
                                        <Button
                                            sx={{color: 'black', display: 'block' }}
                                         onClick={()=>{navigate(`/shops/${user.userId}`)}}>
                                            MY SHOPS
                                        </Button>
                                    </MenuItem> }

                                    {isLoggedIn &&
                                    <MenuItem onClick={handleCloseMenu}>
                                        <Button
                                                sx={{color: 'black', display: 'block' }} onClick={logOut}
                                            >
                                                LogOut
                                        </Button>
                                    </MenuItem>}
                                </Menu>    
                             </Box>
                            {/* for small screens */}

                                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                    {(isLoggedIn && user.role=="ADMIN") &&<>
                                        <Link to='/users'><Button
                                            sx={{ my: 2, color: 'white', display: 'block' }}
                                        >
                                            USERS
                                        </Button></Link>
                                        <Link to='/shopRequests'><Button
                                            sx={{ my: 2, color: 'white', display: 'block' }}
                                        >
                                            SHOP REQUESTS
                                        </Button></Link>
                                    </> }
                                    <Link to="/shops">
                                        <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                                                SHOPS
                                        </Button>
                                    </Link>
                                    {(isLoggedIn && user.role==="SHOP KEEPER") &&<>
                                        <Link to={`/shops/${user.userId}`}><Button
                                            sx={{ my: 2, color: 'white', display: 'block' }}
                                        >
                                            MY SHOPS
                                        </Button></Link>
                                    </> }
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

                                <Box sx={{ flexGrow: 1 }} />
                                
                                <Box sx={{ display:'flex'}}>
                                    <Box sx={{alignContent:'end'}}>
                                        <Link to='/cart'><Button sx={{ my: 2, color: 'white', display: 'block' }}>Cart</Button></Link>
                                    </Box>
                                    
                                    {isLoggedIn &&
                                    <Box sx={{display:{xs:'none', md:'block'}, alignContent:'end'}}>
                                        <Button
                                                sx={{ my: 2, color: 'white', display: 'block' }} onClick={logOut}
                                            >
                                                LogOut
                                        </Button>
                                    </Box>}

                                    {isLoggedIn && 
                                    <Box sx={{alignContent:'end'}}>
                                            <Link to="/profile">
                                            <Stack direction='column'>
                                                <IconButton>
                                                    <AccountCircleIcon fontSize="large"></AccountCircleIcon>
                                                </IconButton>
                                                <Typography color='white'>{user.firstName} {user.lastName}</Typography>
                                            </Stack>
                                            </Link>
                                    </Box>}
                                                        
                                </Box>
                                           
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