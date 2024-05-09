import Box from "@mui/material/Box";
import {AppBar, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import AccountMenu from "./AccountMenu";
import React from "react";


export default function AppAppBar() {

    return (
    <Box sx={{display: 'flex', flexDirection: 'column', padding: 1}}>
        <AppBar position="static" sx={{borderRadius: '10px'}}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    BlaBlaS
                </Typography>
                <Button component={Link} to='/' color="inherit" sx={{borderRadius: '10px'}}>Strona główna</Button>
                <AccountMenu></AccountMenu>
            </Toolbar>
        </AppBar>
    </Box>
    );
}
