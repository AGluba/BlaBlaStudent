import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {
    Container,
    Typography,
    Box,
    Button,
    Grid,
    AppBar,
    Toolbar, CssBaseline,
} from '@mui/material';
import TravelOfferCard from './TravelOfferCard';
import AppAppBar from "./AppAppBar";
import Footer from "./Footer";


const MyOffersPage = () => {
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        fetchOffers().then(r => {
        });
    }, []);

    const fetchOffers = async () => {
        try {
            const response = await axios.get('/api/my-offers/');
            setOffers(response.data);
        } catch (error) {
            console.error('Błąd podczas pobierania ofert:', error);
        }
    };

    const handleDeleteOffer = async (offerId) => {
        try {
            await axios.delete(`/api/offers/${offerId}/`);
            await fetchOffers();
        } catch (error) {
            console.error('Błąd podczas usuwania oferty:', error);
        }
    };

    return (
        <div>
            <CssBaseline/>
            <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
                <AppAppBar></AppAppBar>
                <Container maxWidth="md">
                    <Box sx={{my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Typography variant="h4" gutterBottom>
                            Moje oferty podróży
                        </Typography>
                        <Button
                            component={Link}
                            to="/offers"
                            variant="contained"
                            color="primary"
                            sx={{mb: 2}}
                        >
                            Dodaj nową ofertę
                        </Button>
                        <Grid container spacing={3}>
                            {offers.map((offer) => (
                                <Grid item xs={12} md={12} key={offer.id}>
                                    <TravelOfferCard offer={offer}/>
                                    <Button
                                        component={Link}
                                        to={`/offers/edit/${offer.id}`}
                                        variant="contained"
                                        color="primary"
                                        sx={{mr: 1}}
                                    >
                                        Edytuj
                                    </Button>
                                    <Button
                                        onClick={() => handleDeleteOffer(offer.id)}
                                        variant="contained"
                                        color="error"
                                    >
                                        Usuń
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                    <Footer></Footer>
                </Container>
            </Box>
        </div>
    );
};

export default MyOffersPage;
