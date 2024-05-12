import React, { useState } from 'react';
import { Container, Typography, Box, Button, TextField, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
    const { uid, token } = useParams(); // Odbierz parametry z adresu URL
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            if (password !== confirmPassword) {
                throw new Error('Passwords do not match');
            }

            const response = await axios.post('http://localhost:8000/auth/users/reset_password_confirm/', {
                uid: uid,
                token: token,
                new_password: password
            });
            console.log('Response:', response.data);
            setSuccess(true);
            setNotificationMessage('Hasło zostało zresetowane pomyślnie');
            setNotificationOpen(true);
        } catch (error) {
            console.error('Failed to reset password:', error);
            setNotificationMessage('Nie udało się zresetować hasła');
            setNotificationOpen(true);
        }
    };

    const handleNotificationClose = () => {
        setNotificationOpen(false);
    };

    return (
        <div>
            <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
                <Typography component="h1" variant="h5">
                    Resetowanie hasła
                </Typography>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="password"
                    label="Nowe hasło"
                    type="password"
                    autoComplete="new-password"
                    autoFocus
                    value={password}
                    onChange={handlePasswordChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="confirmPassword"
                    label="Potwierdź nowe hasło"
                    type="password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                />
                <Button
                    onClick={handleSubmit}
                    color="secondary"
                    variant="contained"
                    sx={{ mt: 3, mb: 2, borderRadius: '10px' }}
                    fullWidth
                >
                    Zresetuj hasło
                </Button>
            </Container>
            <Snackbar
                open={notificationOpen}
                autoHideDuration={6000}
                onClose={handleNotificationClose}
            >
                <Alert onClose={handleNotificationClose} severity={success ? "success" : "error"} sx={{ width: '100%' }}>
                    {notificationMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default ResetPassword;
