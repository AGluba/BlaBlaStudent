import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { AppBar, Toolbar, Typography} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AccountMenu from './AccountMenu';
import TravelOfferCard from './TravelOfferCard';

const defaultTheme = createTheme();

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
    fetchTravelOffers().then(r => {});
  }, []);

  const fetchTravelOffers = async () => {
    try {
      const response = await axios.get('api/offers');
      setOffers(response.data);
      setNoOffers(response.data.length === 0);
    } catch (error) {
      console.error('Błąd podczas pobierania ofert:', error);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('offers/search', { params: formData });
      setOffers(response.data);
      setNoOffers(response.data.length === 0);
    } catch (error) {
      console.error('Błąd podczas wysyłania danych:', error);
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
                  <Button type="submit" variant="contained" color="primary">
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
                  <Button component={Link} to="/offers" variant="outlined" color="primary">
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
        <footer>
          <Container sx={{textAlign: 'center', marginTop: '15vh'}}>
            <Typography variant="body2" color="text.secondary">
              {'Wszelkie prawa zastrzeżone © '}
              BlaBlaS&nbsp;
              {new Date().getFullYear()}
            </Typography>
          </Container>
        </footer>
      </ThemeProvider>
  );
}