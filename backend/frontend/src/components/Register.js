import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Link, useNavigate} from 'react-router-dom';
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
    const [errors, setErrors] = useState({})
    const [frontImage, setFrontImage] = useState(null);
    const [backImage, setBackImage] = useState(null);
    const navigate = useNavigate();

    const handleErrorMessage = (message) => {
        if (message === "Istnieje już użytkownik z tą wartością pola email.") {
            return "Istnieje już użytkownik z tym adresem.";
        }
        if (message === "Przesłane dane nie były plikiem. Sprawdź typ kodowania formatki.") {
            return "Nie wybrano pliku."
        }
        if(message === "Istnieje już użytkownik z tą wartością pola username.") {
            return "Istnieje już użytkownik z tą nazwą użytkownika."
        }
        return message;
    }
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
            navigate('/registration-confirmation');
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors(error.response.data);
            }
            console.error('Błąd podczas rejestracji:', error);
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
                  error={!!errors.first_name}
                  helperText={errors.first_name && errors.first_name[0]}
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
                  error={!!errors.last_name}
                  helperText={errors.last_name && errors.last_name[0]}
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
                  error={!!errors.email}
                  helperText={handleErrorMessage(errors.email && errors.email[0])}
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
                  error={!!errors.username}
                  helperText={handleErrorMessage(errors.username && errors.username[0])}
                />
              </Grid>
              <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1, textAlign: 'center' }}>
                    Hasło musi zawierać conajmniej 8 znaków i jedną wielką literę.
                  </Typography>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Hasło"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={!!errors.password}
                  helperText={errors.password && errors.password[0]}
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
                   <InputFileUpload
                       name="image_front"
                       id="image_front"
                       onFileSelect={handleFrontImageSelect}
                       label="Zdjęcie przód legitymacji"
                       error={!!errors.image_front}
                       helperText={handleErrorMessage(errors.image_front && errors.image_front[0])}
                   />
               </Grid>
                <Grid item xs={12}>
                    <InputFileUpload
                        name="image_back"
                        id="image_back"
                        onFileSelect={handleBackImageSelect}
                        label="Zdjęcie tył legitymacji"
                        error={!!errors.image_back}
                        helperText={handleErrorMessage(errors.image_back && errors.image_back[0])}
                    />
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