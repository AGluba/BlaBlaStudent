import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {AppBar, Toolbar} from "@mui/material";
import AccountMenu from './AccountMenu';
import InputFileUpload from "./InputFileUpload";
import axios from 'axios';
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Register() {
    const [frontImage, setFrontImage] = useState(null);
    const [backImage, setBackImage] = useState(null);

    const handleFrontImageSelect = (file) => {
        setFrontImage(file);
    };

    const handleBackImageSelect = (file) => {
        setBackImage(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        data.append('image_front', frontImage);
        data.append('image_back', backImage);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
            username: data.get('username'),
            firstName: data.get('first_name'),
            lastName: data.get('last_name'),
            frontImage: data.get('image_front'),
            backImage: data.get('image_back')
        });
        try {
            const response = await axios.post('/auth/users/', data);
            console.log(response.data);
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
          <Button component={Link} to='/' color="inherit">Strona główna</Button>
          <AccountMenu></AccountMenu>
        </Toolbar>
      </AppBar>
        </Box>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="first_name"
                  required
                  fullWidth
                  id="first_name"
                  label="Imię"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="last_name"
                  label="Nazwisko"
                  name="last_name"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="E-mail"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
               <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="username"
                  label="Nazwa użytkownika"
                  type="text"
                  id="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Hasło"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
               <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password2"
                  label="Powtórz hasło"
                  type="password"
                  id="password2"
                  autoComplete="new-password"
                />
              </Grid>
               <Grid item xs={12}>
                   <InputFileUpload onFileSelect={handleFrontImageSelect} label="Zdjęcie przód legitymacji" />
               </Grid>
                <Grid item xs={12}>
                    <InputFileUpload onFileSelect={handleBackImageSelect} label="Zdjęcie tył legitymacji" />
                </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 , borderRadius: '10px'}}
            >
              Zarejestruj się
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={Link} to='/login' variant="body2">
                  Masz już konto? Zaloguj się
                </Link>
              </Grid>
            </Grid>
          </Box>
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
}