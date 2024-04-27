import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AccountMenu from './AccountMenu';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
const defaultTheme = createTheme();
import Login from './Login';

const AccountActivation = () => {
    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <AppBar position="static" sx={{ borderRadius: '10px' }}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            BlaBlaS
                        </Typography>
                        <Button component={Link} to="/" color="inherit">Strona główna</Button>
                        <AccountMenu></AccountMenu>
                    </Toolbar>
                </AppBar>

                <Container component="main" maxWidth="xs" sx={{ mt: 8, mb: 2 }}>
                    <CssBaseline />
                    <Typography component="h1" variant="h5">
                        Aktywacja konta
                    </Typography>
                    <Typography component="p" sx={{ mt: 2 }}>
                        Twoje konto zostało pomyślnie aktywowane! Możesz się teraz zalogować.
                    </Typography>
                    <Button
                        component={Link}
                        to="/login"
                        variant="contained"
                        sx={{ mt: 3, mb: 2, borderRadius: '10px' }}
                        fullWidth
                    >
                        Wróć
                    </Button>
                </Container>

                <footer sx={{ mt: 'auto', py: 3 }}>
                    <Container>
                        <Typography variant="body2" color="text.secondary" textAlign="center">
                            {'Wszelkie prawa zastrzeżone © '}
                            BlaBlaS&nbsp;
                            {new Date().getFullYear()}
                        </Typography>
                    </Container>
                </footer>
            </Box>
        </ThemeProvider>
    );
};

export default AccountActivation;