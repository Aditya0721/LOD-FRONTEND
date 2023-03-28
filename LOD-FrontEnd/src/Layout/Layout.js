import {Dialog, Box, Button, AppBar, Grid, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { Container } from "@mui/system"
import { useState } from "react"
import { Link, Outlet, Routes, Route} from "react-router-dom"
import { useNavigate } from "react-router-dom"
import Footer from "../footer/footer"
import Home from '../Home/Home';
import EmptyCartWarning from "../Menu/EmptyCartWarning"
import image from "../static/hp-2.jpg"

const Layout = () => {
    const navigate = useNavigate()
    const pages = [["Home","/layout/home"], ["Users","/users"], ["SignUp","/layout/register"], ["LogIn", "/layout/login"]]
    return(<>
            <Grid item xs={12} container border={0} sx={{height: {xl: "50%", xs:"100%", sm:"100%"}, backgroundImage:`url(${image})`, justifyContent:'center', alignItems:'center'}}>
                <Typography  variant="h1" color='Background'>LOD</Typography> 
            </Grid>
            <Grid item xs={12} border={2} container sx={{ height: {xl: "50%", xs:"0%", sm:"0%"}, display:{xs:'none', xl:'flex'}, justifyContent:"center", alignContent:"baseLine"}}>
                <Routes>
                    <Route index element={<Home></Home>}></Route>
                    <Route path='/home' element={<Home></Home>}></Route>
                </Routes>
            </Grid>
            <Grid item xl={12}>
                <Footer></Footer>
            </Grid>
    </>)
   
}

export default Layout