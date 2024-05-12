import React, { useState } from 'react';
import {Container, Typography, Box, Button, TextField, Snackbar, Alert} from '@mui/material';
import { Link } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import AppAppBar from "./AppAppBar";
import Footer from "./Footer";
import axios from 'axios';

const AccountActivation = () => {
    const [email, setEmail] = useState('');
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:8000/auth/users/reset_password/', {
                email: email
            });
            setNotificationMessage('Sprawdź swoją skrzynkę e-mail');
            setNotificationOpen(true);
        } catch (error) {
            console.error('Failed to reset password:', error);
        }
    };

    const handleNotificationClose = () => {
        setNotificationOpen(false);
    };

    return (
        <div>
            <CssBaseline/>
            <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
                <AppAppBar></AppAppBar>
                <Container component="main" maxWidth="xs" sx={{mt: 8, mb: 2}}>
                    <CssBaseline/>
                    <Typography component="h1" variant="h5">
                        Resetowanie hasła
                    </Typography>
                    <Typography component="p" sx={{mt: 2}}>
                        Wpisz swój adres email aby zresetować hasło
                    </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Adres e-mail"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <Button
                        onClick={handleSubmit}
                        color="secondary"
                        variant="contained"
                        sx={{mt: 3, mb: 2, borderRadius: '10px'}}
                        fullWidth
                    >
                        Wyślij
                    </Button>
                </Container>
                <Footer></Footer>
                <Snackbar
                open={notificationOpen}
                autoHideDuration={6000}
                onClose={handleNotificationClose}
            >
                <Alert onClose={handleNotificationClose} severity="success" sx={{ width: '100%' }}>
                    {notificationMessage}
                </Alert>
            </Snackbar>
            </Box>
        </div>
    );
};

export default AccountActivation;
