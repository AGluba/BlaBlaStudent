import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Container, Box, Snackbar, Alert, createTheme, ThemeProvider,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Edit, Delete, Person, DriveEta, Check } from '@mui/icons-material';
import axios from 'axios';

const defaultTheme = createTheme();

const Profile = () => {
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: ''
  });
  const [edit, setEdit] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [newCar, setNewCar] = useState({
    license_plate: '',
    brand: '',
    model: '',
    year: '',
    fuel_consumption: '',
    capacity: ''
  });
  const [car, setCar] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user_data'));
    if (storedUser) {
      setUser({
        first_name: storedUser.first_name || '',
        last_name: storedUser.last_name || '',
        email: storedUser.email || '',
        username: storedUser.username || ''
      });
    }

    const token = localStorage.getItem('access_token');
    const userData = JSON.parse(localStorage.getItem('user_data'));
    const userId = userData.id;
    axios.get(`http://localhost:8000/api/cars/${userId}/`, {
      headers: {
        'Authorization': `JWT ${token}`,
      }
    })
    .then(response => {
      setCar(response.data);
    })
    .catch(error => {
      console.error('Failed to fetch user car', error);
    });
  }, []);

  useEffect(() => {
    if (car) {
      setNewCar(car);
    }
  }, [car]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser(prevState => ({ ...prevState, [name]: value }));
  };

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const userData = JSON.parse(localStorage.getItem('user_data'));
      const userId = userData.id;

      const response = await axios.put(`http://localhost:8000/api/user/update/`, {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        username: user.username
      }, {
        headers: {
          'Authorization': `JWT ${token}`,
          'Content-Type': 'application/json'
        }
      });

      localStorage.setItem('user_data', JSON.stringify(response.data));

      setSnackbarMessage('Profile updated successfully');
      setSnackbarOpen(true);
      setEdit(false);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized: Token may be invalid or expired');
        setSnackbarMessage('Failed to update profile: Unauthorized');
      } else {
        console.error('Failed to update profile', error);
        setSnackbarMessage('Failed to update profile');
      }
      setSnackbarOpen(true);
    }
  };

  const handleAddCar = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveCar = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const userData = JSON.parse(localStorage.getItem('user_data'));
      const userId = userData.id;
      const formData = { ...newCar, user: userId };
      await axios.post('http://localhost:8000/api/cars/', formData, {
        headers: {
          'Authorization': `JWT ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setSnackbarMessage('Car added successfully');
      setSnackbarOpen(true);
      setOpenDialog(false);
    } catch (error) {
      console.error('Failed to add car', error);
      setSnackbarMessage('Failed to add car');
      setSnackbarOpen(true);
    }
  };

  const handleEditProfile = () => {
    setEdit(true);
  };

  const handleEditCar = () => {
    setOpenDialog(true);
  };

  const handleDeleteCar = async () => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.delete(`http://localhost:8000/api/cars/${car.license_plate}/`, {
        headers: {
          'Authorization': `JWT ${token}`
        }
      });
      setCar(null);
      setSnackbarMessage('Car deleted successfully');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Failed to delete car', error);
      setSnackbarMessage('Failed to delete car');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>BlaBlaS</Typography>
          <Button component={Link} to="/" color="inherit">Strona główna</Button>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm">
        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <Person sx={{ fontSize: 40, mr: 2 }} />
            <Typography variant="h5" sx={{ mr: 2 }}>User Information</Typography>
            {edit ? (
              <IconButton onClick={handleUpdateProfile}>
                <Check />
              </IconButton>
            ) : (
              <IconButton onClick={handleEditProfile}>
                <Edit />
              </IconButton>
            )}
          </Box>
          {['first_name', 'last_name', 'email', 'username'].map(key => (
            <TextField
              key={key}
              margin="normal"
              fullWidth
              label={key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
              name={key}
              value={user[key]}
              onChange={handleChange}
              disabled={!edit}
            />
          ))}
          {car ? (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <DriveEta sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h5" sx={{ mr: 2 }}>Car Information</Typography>
                <IconButton onClick={handleEditCar}>
                  <Edit />
                </IconButton>
                <IconButton onClick={handleDeleteCar} color="error">
                  <Delete />
                </IconButton>
              </Box>
              <ul>
                <li>License Plate: {car.license_plate}</li>
                <li>Brand: {car.brand}</li>
                <li>Model: {car.model}</li>
                <li>Year: {car.year}</li>
                <li>Fuel Consumption: {car.fuel_consumption}</li>
                <li>Capacity: {car.capacity}</li>
              </ul>
            </>
          ) : (
            <Button
              sx={{ mt: 2 }}
              variant="contained"
              onClick={handleAddCar}
            >
              Add Car
            </Button>
          )}
        </Box>
      </Container>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{car ? 'Edit Car' : 'Add Car'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            fullWidth
            label="License Plate"
            name="license_plate"
            value={newCar.license_plate}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Brand"
            name="brand"
            value={newCar.brand}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Model"
            name="model"
            value={newCar.model}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Year"
            name="year"
            value={newCar.year}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Fuel Consumption"
            name="fuel_consumption"
            value={newCar.fuel_consumption}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Capacity"
            name="capacity"
            value={newCar.capacity}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={car ? handleUpdateProfile : handleSaveCar} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="info" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default Profile;
