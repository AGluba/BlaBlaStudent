import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  AppBar,
  Toolbar,
} from '@mui/material';
import TravelOfferCard from './TravelOfferCard';
import AccountMenu from './AccountMenu';
import {createTheme, ThemeProvider} from '@mui/material/styles';

const defaultTheme = createTheme();

const MyOffersPage = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    fetchOffers().then(r => {});
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
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{display: 'flex', flexDirection: 'column', padding: 1}}>
          <AppBar position="static" sx={{borderRadius: '10px'}}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                BlaBlaS
              </Typography>
              <Button component={Link} to="/" color="inherit">
                Strona główna
              </Button>
              <AccountMenu/>
            </Toolbar>
          </AppBar>
        </Box>
        <Container maxWidth="md">
          <Box sx={{my: 4}}>
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
                  <Grid item xs={12} md={6} key={offer.id}>
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
          <footer>
            <Container sx={{textAlign: 'center', marginTop: '15vh'}}>
              <Typography variant="body2" color="text.secondary">
                {'Wszelkie prawa zastrzeżone © '}
                BlaBlaS&nbsp;
                {new Date().getFullYear()}
              </Typography>
            </Container>
          </footer>
        </Container>
      </ThemeProvider>
  );
};

export default MyOffersPage;
