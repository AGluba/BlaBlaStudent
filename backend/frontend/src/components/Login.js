import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {
    AppBar, Toolbar, Typography, Button, Container, Grid, Box, CssBaseline,
    TextField
} from '@mui/material';
import axios from "axios";
import AppAppBar from "./AppAppBar";
import Footer from "./Footer";

const Login = () => {
    const [errors, setErrors] = useState({})
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/token/', {
                email: email,
                password: password,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const {access, refresh, ...userData} = response.data;
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
            localStorage.setItem('user_data', JSON.stringify(userData));
            navigate('/');
        } catch (error) {
            console.error('Błąd przy logowaniu:', error.response ? error.response.data : 'No response data');
            if (error.response && error.response.data) {
                setErrors(error.response.data);
            }
        }
    };


    return (
        <div>
            <CssBaseline/>
            <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
                <AppAppBar></AppAppBar>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="E-mail"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={!!errors.email}
                                helperText={errors.email && errors.email[0]}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Hasło"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={!!errors.password}
                                helperText={errors.password && errors.password[0]}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                color="secondary"
                                variant="contained"
                                sx={{mt: 3, mb: 2, borderRadius: '10px'}}
                            >
                                Zaloguj
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link to="/reset_password" variant="body2">
                                        Zapomniałeś hasła?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link to="/register" variant="body2">
                                        Nie masz konta? Zarejestruj się
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Footer></Footer>
                </Container>
            </Box>
        </div>
    );
};

export default Login;