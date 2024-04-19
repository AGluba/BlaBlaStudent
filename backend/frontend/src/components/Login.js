import * as React from 'react';
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
import axios from "axios";


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
          try {
          const response = await axios.post('/auth/jwt/create/', Object.fromEntries(data.entries()), {
              headers: {
                  'Content-Type': 'application/json'
              }
          });
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
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Hasło"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 , borderRadius: '10px'}}
            >
              Zaloguj
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Zapomniałeś hasła?
                </Link>
              </Grid>
              <Grid item>
                <Link component={Link} to='/register' variant="body2">
                  {"Nie masz konta? Zarejestruj się"}
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