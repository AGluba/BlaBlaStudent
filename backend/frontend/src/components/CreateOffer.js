import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import {CssBaseline, Typography} from '@mui/material';
import axios from 'axios';

import AppAppBar from "./AppAppBar";
import Footer from "./Footer";


export default function CreateOfferForm() {
    const [errors, setErrors] = useState({})
    const storedUser = JSON.parse(localStorage.getItem('user_data'));
    const token = localStorage.getItem('access_token');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        try {
            await axios.post('api/offers-add/', formData, {
                headers: {
                    'Authorization': `JWT ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate('search/');
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors(error.response.data);
                console.log('Błędy walidacji:', error.response.data);
            }
            console.error('Błąd podczas wysyłania danych:', error);
        }
    };

    return (
        <div>
            <CssBaseline/>
            <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
                <AppAppBar></AppAppBar>
                <Container component="main" maxWidth="md">
                    <Box sx={{marginTop: 8}}>
                        <Typography variant="h4" gutterBottom sx={{textAlign: 'center'}}>
                            Dodaj ofertę podróży
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        autoFocus
                                        autoComplete="off"
                                        fullWidth
                                        name="title"
                                        label="Tytuł"
                                        error={!!errors.title}
                                        helperText={errors.title && errors.title[0]}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="description"
                                        label="Opis"
                                        error={!!errors.description}
                                        helperText={errors.description && errors.description[0]}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="price"
                                        label="Cena"
                                        type="number"
                                        error={!!errors.price}
                                        helperText={errors.price && errors.price[0]}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="date_departure"
                                        label="Data wyjazdu"
                                        type="datetime-local"
                                        InputLabelProps={{shrink: true}}
                                        error={!!errors.date_departure}
                                        helperText={errors.date_departure && errors.date_departure[0]}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="place_departure"
                                        label="Miejsce wyjazdu"
                                        error={!!errors.place_departure}
                                        helperText={errors.place_departure && errors.place_departure[0]}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="phone_number"
                                        label="Numer telefonu"
                                        type="tel"
                                        error={!!errors.phone_number}
                                        helperText={errors.phone_number && errors.phone_number[0]}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="place_arrival"
                                        label="Miejsce przyjazdu"
                                        error={!!errors.place_arrival}
                                        helperText={errors.place_arrival && errors.place_arrival[0]}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="number_of_seats"
                                        label="Liczba miejsc"
                                        type="number"
                                        error={!!errors.number_of_seats}
                                        helperText={errors.number_of_seats && errors.number_of_seats[0]}
                                    />
                                </Grid>
                                <Grid item xs={12} container justifyContent="center">
                                    <Button
                                        type="submit"
                                        color="secondary"
                                        variant="contained"
                                        sx={{mt: 3, mb: 2, borderRadius: '10px'}}
                                    >
                                        Dodaj ofertę
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Footer></Footer>
                </Container>
            </Box>
        </div>
    );
}
