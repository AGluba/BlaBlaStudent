import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useParams, useNavigate} from 'react-router-dom';
import { Container, Typography, Box, Button, TextField, Grid, AppBar, Toolbar } from '@mui/material';
import AccountMenu from "./AccountMenu";
import {createTheme, ThemeProvider} from "@mui/material/styles";

const EditOfferPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const defaultTheme = createTheme();
  const [formData, setFormData] = useState({
    title: '',
    place_departure: '',
    place_arrival: '',
    date_departure: '',
    description: '',
    price: '',
    number_of_seats: ''
  });

  useEffect(() => {
    fetchOffer(id).then(r => {});
  }, [id]);

  const fetchOffer = async (id) => {
    try {
      const response = await axios.get(`/api/offers/${id}`);
      setFormData(response.data);
    } catch (error) {
      console.error('Błąd podczas pobierania oferty:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/offers/${id}/`, formData);
      navigate('/my-offers');
    } catch (error) {
      console.error('Błąd podczas edycji oferty:', error);
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
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" gutterBottom>
            Edytuj ofertę podróży
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
            </Grid>
            <Box sx={{ mt: 2 }}>
              <Button type="submit" variant="contained" color="primary">
                Zapisz zmiany
              </Button>
              <Button component={Link} to="/my-offers" variant="outlined" sx={{ ml: 2 }}>
                Anuluj
              </Button>
            </Box>
          </form>
        </Box>
        <footer>
          <Container sx={{ textAlign: 'center', marginTop: '15vh' }}>
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

export default EditOfferPage;
