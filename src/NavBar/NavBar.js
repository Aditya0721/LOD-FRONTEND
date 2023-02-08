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

const NavBar = ()=>{
    const pages = [["Users","/users"], ["SignUp","/register"], ["LogIn", "/login"]]
    const isLoggedIn = useSelector(state=>state.auth.isLoggedIn)
    const dispatch = useDispatch()

    const logOut = ()=>{
        dispatch(authActions.logOut())
        dispatch(authActions.setUser({}))
    }
    return(
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
                                    <Link to='/users'><Button
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        USERS
                                    </Button></Link>
                                    {!isLoggedIn && <Link to='/register'><Button
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        Rgister
                                    </Button></Link>}
                                    {!isLoggedIn && <Link to='/login'><Button
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        LogIn
                                    </Button></Link>}
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
            )
}

export default NavBar