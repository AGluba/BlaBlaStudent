import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AccountMenu from './AccountMenu';

const defaultTheme = createTheme();

export default function CreateOfferForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    date_departure: '',
    place_departure: '',
    place_arrival: '',
    number_of_seats: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('api/offers-add', formData);
      navigate('offers/search');
    } catch (error) {
      console.error('Błąd podczas wysyłania danych:', error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: 1 }}>
        <AppBar position="static" sx={{ borderRadius: '10px' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              BlaBlaS
            </Typography>
            <Button component={Link} to="/" color="inherit">
              Strona główna
            </Button>
            <AccountMenu />
          </Toolbar>
        </AppBar>
      </Box>
      <Container component="main" maxWidth="md">
        <Box sx={{marginTop: 8}}>
          <Typography variant="h4" gutterBottom>
            Dodaj ofertę podróży
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                    required
                    fullWidth
                    name="title"
                    label="Tytuł"
                    value={formData.title}
                    onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                    required
                    fullWidth
                    name="description"
                    label="Opis"
                    value={formData.description}
                    onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                    required
                    fullWidth
                    name="price"
                    label="Cena"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
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
                    value={formData.date_departure}
                    onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                    required
                    fullWidth
                    name="place_departure"
                    label="Miejsce wyjazdu"
                    value={formData.place_departure}
                    onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                    required
                    fullWidth
                    name="place_arrival"
                    label="Miejsce przyjazdu"
                    value={formData.place_arrival}
                    onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                    required
                    fullWidth
                    name="number_of_seats"
                    label="Liczba miejsc"
                    type="number"
                    value={formData.number_of_seats}
                    onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                  Dodaj ofertę
                </Button>
              </Grid>
            </Grid>
          </form>
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
}
