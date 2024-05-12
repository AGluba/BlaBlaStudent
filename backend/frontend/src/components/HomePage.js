import React, {Component, useEffect, useState} from 'react';
import {render} from 'react-dom';
import {Link, useNavigate} from 'react-router-dom';
import {AppBar, Toolbar, Typography, Button, Container, Grid, Box, CssBaseline} from '@mui/material';
import {DirectionsCar, Wallet, Handshake} from '@mui/icons-material';
import AccountMenu from './AccountMenu';
import AppAppBar from "./AppAppBar";
import Footer from "./Footer";
import TextField from "@mui/material/TextField";
import axios from "axios";


const HomePage = () => {
    const storedUser = JSON.parse(localStorage.getItem('user_data'));
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        try {
            navigate('/offers/search', {state: {formData: Object.fromEntries(formData)}});
        } catch (error) {
            console.error('Błąd podczas wysyłania danych:', error);
        }
    };

    return (
        <div>
            <CssBaseline/>
            <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
                <AppAppBar></AppAppBar>
                <section id="hero">
                    <Container component="main" maxWidth="md">
                        <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <Typography variant="h4" gutterBottom>
                                Wyszukaj oferty podróży
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={3} sx={{marginTop: 1}}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            name="place_departure"
                                            label="Miejsce wyjazdu"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            name="place_arrival"
                                            label="Miejsce przyjazdu"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            name="date_departure"
                                            label="Data wyjazdu"
                                            type="date"
                                            InputLabelProps={{shrink: true}}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            name="max_price"
                                            label="Maksymalna cena"
                                            type="number"
                                        />
                                    </Grid>
                                    <Grid item xs={12} container justifyContent="center">
                                        <Button type="submit" variant="contained" color="secondary">
                                            Szukaj
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Box>
                    </Container>
                </section>

                <section id="features">
                    <Container sx={{textAlign: 'center', marginTop: '5vh'}}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={4}>
                                <div>
                                    <DirectionsCar sx={{fontSize: 150}}/>
                                    <Typography sx={{textAlign: 'center'}} variant="h5" gutterBottom>Szeroki wybór
                                        tras</Typography>
                                    <Typography>Oferujemy przejazdy nie tylko, między dużymi miastami.</Typography>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <div>
                                    <Wallet sx={{fontSize: 150}}/>
                                    <Typography sx={{textAlign: 'center'}} variant="h5" gutterBottom>Tania
                                        podróż</Typography>
                                    <Typography>Znajdziesz atrakcyjne oferty podróży po niskich cenach.</Typography>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <div>
                                    <Handshake sx={{fontSize: 150}}/>
                                    <Typography sx={{textAlign: 'center'}} variant="h5"
                                                gutterBottom>Bezpieczeństwo</Typography>
                                    <Typography>Dbamy o bezpieczeństwo naszych użytkowników i zapewniamy weryfikację
                                        konta.</Typography>
                                </div>
                            </Grid>
                        </Grid>
                    </Container>
                </section>
                <Footer></Footer>
            </Box>
        </div>
    );
};


export default HomePage;
