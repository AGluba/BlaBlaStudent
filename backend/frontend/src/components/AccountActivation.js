import React, {useEffect, useState} from 'react';
import {Container, Typography, Box, AppBar, Toolbar, Button} from '@mui/material';
import {Link} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import AppAppBar from "./AppAppBar";
import Footer from "./Footer";

const AccountActivation = () => {
    return (
        <div>
            <CssBaseline/>
            <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
                <AppAppBar></AppAppBar>
                <Container component="main" maxWidth="xs" sx={{mt: 8, mb: 2}}>
                    <CssBaseline/>
                    <Typography component="h1" variant="h5">
                        Aktywacja konta
                    </Typography>
                    <Typography component="p" sx={{mt: 2}}>
                        Twoje konto zostało pomyślnie aktywowane! Możesz się teraz zalogować.
                    </Typography>
                    <Button
                        component={Link}
                        to="/login"
                        color="secondary"
                        variant="contained"
                        sx={{mt: 3, mb: 2, borderRadius: '10px'}}
                        fullWidth
                    >
                        Wróć
                    </Button>
                </Container>
                <Footer></Footer>
            </Box>
        </div>
    );
};

export default AccountActivation;