import React from 'react';
import { Container, Typography, Box, AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AccountMenu from './AccountMenu';
import axios from "axios";
const defaultTheme = createTheme();

const RegistrationConfirmation = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', padding: 1 }}>
        <AppBar position="static" sx={{ borderRadius: '10px' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              BlaBlaS
            </Typography>
            <Button component={Link} to='/' color="inherit">Strona główna</Button>
          </Toolbar>
        </AppBar>
        <Container component="main" maxWidth="xs" sx={{ mt: 8, mb: 2 }}>
          <CssBaseline />
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5" component="h1" sx={{ mt: 4, mb: 2 }}>
              Dziękujemy za rejestrację!
            </Typography>
            <Typography>
              Na Twój adres e-mail została wysłana wiadomość z linkiem aktywacyjnym. Prosimy o sprawdzenie poczty i aktywację konta.
            </Typography>
          </Box>
        </Container>
        <footer>
          <Container sx={{ textAlign: 'center', marginTop: 'auto', padding: '20px 0' }}>
            <Typography variant="body2" color="text.secondary">
              {'Wszelkie prawa zastrzeżone © '}
              BlaBlaS {new Date().getFullYear()}
            </Typography>
          </Container>
        </footer>
      </Box>
    </ThemeProvider>
  );
};

export default RegistrationConfirmation;