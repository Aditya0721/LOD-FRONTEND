import { Grid, List, ListItemButton, ListItemText } from "@mui/material"
import { useState } from "react"
import { Link, Outlet} from "react-router-dom"

const Layout = () => {
    return(<>    
        <Grid container spacing={2}>
            <Grid item xs={3} style={{backgroundColor:'rgba(255,255,255,0.8)'}}>
                <nav>
                <ListItemButton component="a" href="#customized-list">
                        <Link to="/home">
                            <ListItemText
                                sx={{ my: 0 }}
                                primary="Home"
                                primaryTypographyProps={{
                                fontSize: 20,
                                fontWeight: 'medium',
                                letterSpacing: 0,
                                }}
                            />
                        </Link>
                    </ListItemButton>
                    <ListItemButton component="a" href="#customized-list">
                        <Link to="/users">
                            <ListItemText
                                sx={{ my: 0 }}
                                primary="USERS"
                                primaryTypographyProps={{
                                fontSize: 20,
                                fontWeight: 'medium',
                                letterSpacing: 0,
                                }}
                            />
                        </Link>
                    </ListItemButton>
                    <ListItemButton component="a" href="#customized-list">
                        <Link to="/Register">
                            <ListItemText
                                sx={{ my: 0 }}
                                primary="Register"
                                primaryTypographyProps={{
                                fontSize: 20,
                                fontWeight: 'medium',
                                letterSpacing: 0,
                                }}
                            />
                        </Link>
                    </ListItemButton>
                </nav>
            </Grid>
            <Grid item xs={9}
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{bgcolor:'darkgrey'}}>
                <Outlet></Outlet>
            </Grid>
        </Grid>
    </>)
   
}

export default Layout