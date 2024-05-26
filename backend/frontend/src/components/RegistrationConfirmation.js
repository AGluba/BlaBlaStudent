import React from 'react';
import {Container, Typography, Box, AppBar, Toolbar, Button} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import AppAppBar from "./AppAppBar";
import Footer from "./Footer";


const RegistrationConfirmation = () => {
    return (
        <div>
            <CssBaseline/>
            <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
                <AppAppBar></AppAppBar>
                <Container component="main" maxWidth="xs" sx={{mt: 8, mb: 2}}>
                    <CssBaseline/>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Typography variant="h5" component="h1" sx={{mt: 4, mb: 2}}>
                            Dziękujemy za rejestrację!
                        </Typography>
                        <Typography>
                            Na Twój adres e-mail została wysłana wiadomość z linkiem aktywacyjnym. Prosimy o sprawdzenie
                            poczty i aktywację konta.
                        </Typography>
                    </Box>
                </Container>
                <Footer></Footer>
            </Box>
        </div>
    );
};

export default RegistrationConfirmation;