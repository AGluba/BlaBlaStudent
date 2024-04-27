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

// Definicja motywu, jeśli używasz motywów MUI
const defaultTheme = createTheme();

const Profile = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: 1 }}>
        <AppBar position="static" sx={{ borderRadius: '10px' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              BlaBlaS
            </Typography>
            <Button component={Link} to="/" color="inherit">Strona główna</Button>
            <AccountMenu />
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
          <Typography component="h1" variant="h5">
            Profil użytkownika
          </Typography>
          <Typography component="p">
            {/* Tutaj dodaj resztę zawartości swojej strony profilu */}
            To jest strona profilu. Tutaj możesz dodać więcej informacji o użytkowniku.
          </Typography>
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

export default Profile;
