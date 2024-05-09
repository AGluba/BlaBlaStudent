import React, {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import {AppBar, CssBaseline, Toolbar, Typography} from '@mui/material';
import axios from 'axios';
import {Link} from 'react-router-dom';
import TravelOfferCard from './TravelOfferCard';
import AppAppBar from "./AppAppBar";
import Footer from "./Footer";


export default function SearchTravelOffersForm() {
    const [formData, setFormData] = useState({
        place_departure: '',
        place_arrival: '',
        date_departure: '',
        max_price: ''
    });
    const [offers, setOffers] = useState([]);
    const [noOffers, setNoOffers] = useState(false);

    useEffect(() => {
        fetchTravelOffers().then(r => {
        });
    }, []);

    const fetchTravelOffers = async () => {
        try {
            const response = await axios.get('api/offers/');
            setOffers(response.data);
            setNoOffers(response.data.length === 0);
        } catch (error) {
            console.error('Błąd podczas pobierania ofert:', error);
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('/api/offers/', {params: formData});
            setOffers(response.data);
            setNoOffers(response.data.length === 0);
        } catch (error) {
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
                        <Typography variant="h4" gutterBottom>
                            Wyszukaj oferty podróży
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        name="place_departure"
                                        label="Miejsce wyjazdu"
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        name="place_arrival"
                                        label="Miejsce przyjazdu"
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        name="date_departure"
                                        label="Data wyjazdu"
                                        type="datetime-local"
                                        InputLabelProps={{shrink: true}}
                                        value={formData.date_departure}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        name="max_price"
                                        label="Maksymalna cena"
                                        type="number"
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" color="secondary">
                                        Szukaj
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                        {noOffers && (
                            <Box sx={{marginTop: 2}}>
                                <Typography variant="body1" gutterBottom>
                                    Brak dostępnych ofert podróży. Chcesz dodać nową ofertę?
                                </Typography>
                                <Button component={Link} to="/add-offers" variant="outlined" color="secondary">
                                    Dodaj nową ofertę
                                </Button>
                            </Box>
                        )}
                        {!noOffers && (
                            <Box sx={{marginTop: 4}}>
                                <Typography variant="h5" gutterBottom>
                                    Dostępne oferty podróży
                                </Typography>
                                {offers.map((offer) => (
                                    <TravelOfferCard key={offer.id} offer={offer}/>
                                ))}
                            </Box>
                        )}
                    </Box>
                </Container>
                <Footer></Footer>
            </Box>
        </div>
    );
}
