import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Grid, Box, CssBaseline } from '@mui/material';
import { DirectionsCar, Wallet, Handshake } from '@mui/icons-material';
import AccountMenu from './AccountMenu';

const HomePage = () => {
  return (
    <div>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', padding: 1 }}>
      <AppBar position="static" sx={{ borderRadius: '10px' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BlaBlaS
          </Typography>
          <Button component={Link} to='/' color="inherit">Strona główna</Button>
          <AccountMenu></AccountMenu>
        </Toolbar>
      </AppBar>

      <section id="hero">
        <Container sx={{ textAlign: 'center', flexGrow: 1, padding: 10 }}>
          <Typography variant="h2" gutterBottom>Znajdź lub zaoferuj przejazd!</Typography>
          <Typography paragraph>Podróżuj z innymi studentami dzięki BlaBlaS.</Typography>
          <Typography paragraph>Dołącz do naszej społeczności już dzisiaj!</Typography>
          <Button sx={{ marginTop: '20px', borderRadius: '10px' }} variant="contained" color="primary" component={Link} to='/register'>Założ konto</Button>
          <Button sx={{ marginTop: '20px', borderRadius: '10px', marginLeft: '10px' }} variant="contained" color="primary" component={Link} to='/offers'>Dodaj ofertę</Button>
          <Button sx={{ marginTop: '20px', borderRadius: '10px', marginLeft: '10px' }} variant="contained" color="primary" component={Link} to='/offers/search'>Szukaj ofert</Button>
        </Container>
      </section>

      <section id="features">
        <Container sx={{ textAlign: 'center', marginTop: '5vh' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <div>
                <DirectionsCar sx={{ fontSize: 150 }}/>
                <Typography sx={{ textAlign: 'center' }} variant="h5" gutterBottom>Szeroki wybór tras</Typography>
                <Typography>Oferujemy przejazdy nie tylko, między dużymi miastami.</Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div>
                <Wallet sx={{ fontSize: 150 }}/>
                <Typography sx={{ textAlign: 'center' }} variant="h5" gutterBottom>Tania podróż</Typography>
                <Typography>Znajdziesz atrakcyjne oferty podróży po niskich cenach.</Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div>
                <Handshake sx={{ fontSize: 150 }}/>
                <Typography sx={{ textAlign: 'center' }} variant="h5" gutterBottom>Bezpieczeństwo</Typography>
                <Typography>Dbamy o bezpieczeństwo naszych użytkowników i zapewniamy weryfikację konta.</Typography>
              </div>
            </Grid>
          </Grid>
        </Container>
      </section>

      <footer>
        <Container sx={{ textAlign: 'center', marginTop: '15vh' }}>
          <Typography variant="body2" color="text.secondary">
            {'Wszelkie prawa zastrzeżone © '}
            BlaBlaS&nbsp;
            {new Date().getFullYear()}
          </Typography>
        </Container>
      </footer>
        </Box>
    </div>
  );
};


export default HomePage;
