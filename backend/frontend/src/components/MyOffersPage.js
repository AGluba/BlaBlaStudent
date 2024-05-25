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
import EmissionInfo from "./EmissionInfo";


const MyOffersPage = () => {
    const [offers, setOffers] = useState([]);
    const [showEmissionInfo, setShowEmissionInfo] = useState(false);
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        fetchOffers().then(r => {
        });
    }, []);

    const fetchOffers = async () => {
        try {
            const response = await axios.get('/api/my-offers/',
                {
                    headers: {
                        'Authorization': `JWT ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
            setOffers(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Błąd podczas pobierania ofert:', error);
        }
    };

    const handleDeleteOffer = async (offerId) => {
        try {
            await axios.delete(`/api/offers/${offerId}/`, {
                headers: {
                    'Authorization': `JWT ${token}`,
                }
            });
            await fetchOffers();
        } catch (error) {
            console.error('Błąd podczas usuwania oferty:', error);
        }
    };

    const handleEndOffer = async (offerId) => {
        try {
            await axios.put(`/api/offers-archive/${offerId}/`, {
                headers: {
                    'Authorization': `JWT ${token}`,
                }
            });
            setOffers(offers.map(offer => offer.id === offerId ? {...offer, ended: true} : offer));
            setShowEmissionInfo(true);
            setTimeout(async () => {
                await fetchOffers();
                setShowEmissionInfo(false);
            }, 4000);
            return () => clearTimeout(timer);
        } catch (error) {
            console.error('Błąd podczas zakończenia oferty:', error);
        }
    }

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
                            color="secondary"
                            sx={{mb: 2}}
                        >
                            Dodaj nową ofertę
                        </Button>
                        {showEmissionInfo ? <EmissionInfo/> : (
                            <Grid container spacing={3}>
                                {offers.filter(offer => offer.status === true).map((offer) => (
                                    <Grid item xs={12} md={12} key={offer.id}>
                                        <TravelOfferCard offer={offer}/>
                                        {!offer.ended && (
                                            <>
                                                <Button
                                                    onClick={() => handleEndOffer(offer.id)}
                                                    variant="contained"
                                                    color="secondary"
                                                    sx={{mr: 1, marginTop: 0.3}}
                                                >
                                                    Zakończ
                                                </Button>
                                                <Button
                                                    component={Link}
                                                    to={`/offers/edit/${offer.id}`}
                                                    variant="contained"
                                                    color="secondary"
                                                    sx={{mr: 1, marginTop: 0.3}}
                                                >
                                                    Edytuj
                                                </Button>
                                                <Button
                                                    onClick={() => handleDeleteOffer(offer.id)}
                                                    variant="contained"
                                                    color="error"
                                                    sx={{mr: 1, marginTop: 0.3}}
                                                >
                                                    Usuń
                                                </Button>
                                            </>
                                        )}
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Box>
                </Container>
            </Box>
            {showEmissionInfo ? <Footer></Footer> : <Footer></Footer>}
        </div>
    );
};

export default MyOffersPage;
