import Box from "@mui/material/Box";
import {AppBar, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import AccountMenu from "./AccountMenu";
import React from "react";
import logo from '../../static/images/logo_blablas.png';

export default function AppAppBar() {
    const storedUser = localStorage.getItem('user_data');

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', padding: 1}}>
            <AppBar position="static" sx={{borderRadius: '10px'}}>
                {storedUser ? (<Toolbar>
                        <img src={logo} alt="logo" style={{width: '65px', height: '65px'}}/>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            BlaBlaS
                        </Typography>
                        <Button component={Link} to='/' color="inherit" sx={{borderRadius: '10px'}}>Strona
                            główna</Button>
                        <Button component={Link} to='/offers/search' color="inherit"
                                sx={{borderRadius: '10px'}}>Szukaj</Button>
                        <Button component={Link} to='/offers' color="inherit" sx={{borderRadius: '10px'}}>Dodaj
                            ofertę</Button>
                        <AccountMenu></AccountMenu>
                    </Toolbar>
                ) : (
                    <Toolbar>
                        <img src={logo} alt="logo" style={{width: '65px', height: '65px'}}/>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            BlaBlaS
                        </Typography>
                        <Button component={Link} to='/' color="inherit" sx={{borderRadius: '10px'}}>Strona
                            główna</Button>
                        <Button component={Link} to='/offers/search' color="inherit"
                                sx={{borderRadius: '10px'}}>Szukaj</Button>
                        <Button component={Link} to='/login' color="inherit" sx={{borderRadius: '10px'}}>Dodaj
                            ofertę</Button>
                        <AccountMenu></AccountMenu>
                    </Toolbar>
                )}
            </AppBar>
        </Box>
    );
}
