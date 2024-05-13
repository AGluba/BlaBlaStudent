import React, { useEffect, useState } from 'react';
import {
    Alert,
    Box,
    Button,
    Container,
    CssBaseline,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Paper,
    Snackbar,
    TextField,
    Typography,
} from '@mui/material';
import { Check, Delete, DriveEta, Edit, Person } from '@mui/icons-material';
import axios from 'axios';
import AppAppBar from "./AppAppBar";
import Footer from "./Footer";

const Profile = () => {
    const storedUser = JSON.parse(localStorage.getItem('user_data'));
    const token = localStorage.getItem('access_token');
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
    const [editedData, setEditedData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        username: ''
    });
    const [newCar, setNewCar] = useState({
        license_plate: '',
        brand: '',
        model: '',
        generation: '',
        year: '',
        fuel: '',
        fuel_consumption: '',
        capacity: ''
    });
    const [car, setCar] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedUser = JSON.parse(localStorage.getItem('user_data'));
                if (storedUser) {
                    setUser({
                        first_name: storedUser.first_name || '',
                        last_name: storedUser.last_name || '',
                        email: storedUser.email || '',
                        username: storedUser.username || ''
                    });
                    setEditedData({
                        first_name: storedUser.first_name || '',
                        last_name: storedUser.last_name || '',
                        email: storedUser.email || '',
                        username: storedUser.username || ''
                    });
                }

                const token = localStorage.getItem('access_token');
                const userData = JSON.parse(localStorage.getItem('user_data'));
                const userId = userData.id;
                const response = await axios.get(`http://localhost:8000/api/cars/${userId}/`, {
                    headers: {
                        'Authorization': `JWT ${token}`,
                    }
                });
                setCar(response.data);
            } catch (error) {
                console.error('Failed to fetch user car', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (car) {
            setNewCar(car);
        }
    }, [car]);

    const handleUserChange = (event) => {
        const { name, value } = event.target;
        setEditedData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleCarChange = (event) => {
        const { name, value } = event.target;
        setNewCar(prevState => ({ ...prevState, [name]: value }));
    };

    const handleUpdateData = async () => {
        try {
            const userData = JSON.parse(localStorage.getItem('user_data'));
            console.log({id: userData.id,
                first_name: editedData.first_name,
                last_name: editedData.last_name,
                username: editedData.username,
                email: editedData.email,
                is_active: userData.is_active,
                status: userData.status});

            const response = await axios.put('http://localhost:8000/auth/users/me/', {
                id: userData.id,
                first_name: editedData.first_name,
                last_name: editedData.last_name,
                username: editedData.username,
                email: editedData.email,
                is_active: userData.is_active,
                status: userData.status
            }, {
                headers: {
                    'Authorization': `JWT ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            localStorage.setItem('user_data', JSON.stringify(response.data));

            setSnackbarMessage('Profil zaaktualizowany pomyślnie!');
            setSnackbarOpen(true);
            setEdit(false);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error('Unauthorized: Token may be invalid or expired');
                setSnackbarMessage('Nie udało się zaaktualizować konta: brak dostępu');
            } else {
                console.error('Failed to update profile', error);
                setSnackbarMessage('Nie udało się zaaktualizować konta');
            }
            setSnackbarOpen(true);
        }
    };

    const handleUpdateCar = async () => {
        try {
            const userData = JSON.parse(localStorage.getItem('user_data'));
            const userId = userData.id;
            const response = await axios.put(`http://localhost:8000/api/cars/${userId}/`, newCar, {
                headers: {
                    'Authorization': `JWT ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            setCar(response.data);
            setSnackbarMessage('Dane samochodu zaktualizowane pomyślnie!');
            setSnackbarOpen(true);
            setOpenDialog(false);
        } catch (error) {
            console.error('Failed to update car data', error);
            setSnackbarMessage('Nie udało się zaktualizować danych samochodu');
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
            const userData = JSON.parse(localStorage.getItem('user_data'));
            const userId = userData.id;
            const formData = { ...newCar, user: userId };
            await axios.post('http://localhost:8000/api/cars/', formData, {
                headers: {
                    'Authorization': `JWT ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setSnackbarMessage('Samochód dodany pomyślnie!');
            setSnackbarOpen(true);

            const response = await axios.get(`http://localhost:8000/api/cars/${userId}/`, {
            headers: {
                'Authorization': `JWT ${token}`,
            }
            });
            setCar(response.data);

            setOpenDialog(false);
        } catch (error) {
            console.error('Failed to add car', error);
            setSnackbarMessage('Nie udało się dodać samochodu!');
            setSnackbarOpen(true);
        }
    };

    useEffect(() => {
    if (car === null) {
        setNewCar({
            license_plate: '',
            brand: '',
            model: '',
            generation: '',
            year: '',
            fuel: '',
            fuel_consumption: '',
            capacity: ''
        });
    }
    }, [car]);

    const handleEditData = () => {
        setEdit(true);
    };

    const handleEditCar = () => {
        setOpenDialog(true);
    };

    const handleDeleteCar = async () => {
        try {
            const userData = JSON.parse(localStorage.getItem('user_data'));
            const userId = userData.id;
            await axios.delete(`http://localhost:8000/api/cars/${userId}/`, {
                headers: {
                    'Authorization': `JWT ${token}`
                }
            });
            setCar(null);
            setSnackbarMessage('Samochód usunięty pomyślnie!');
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Failed to delete car', error);
            setSnackbarMessage('Nie udało się usunąć samochodu!');
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = (_, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const translatedLabels = {
        first_name: 'Imię',
        last_name: 'Nazwisko',
        email: 'Email',
        username: 'Nazwa użytkownika',
        license_plate: 'Numer rejestracyjny',
        brand: 'Marka',
        model: 'Model',
        generation: 'Generacja',
        year: 'Rok produkcji',
        fuel: 'Rodzaj paliwa',
        fuel_consumption: 'Spalanie',
        capacity: 'Pojemność'
    };

    return (
        <div>
            <CssBaseline/>
            <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
                <AppAppBar></AppAppBar>
                <Container component="main" maxWidth="sm">
                    <Box sx={{mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Box sx={{display: 'flex', alignItems: 'center', mt: 2}}>
                            <Person sx={{fontSize: 40, mr: 2}}/>
                            <Typography variant="h5" sx={{mr: 2}}>Mój profil</Typography>
                            {edit ? (
                                <IconButton onClick={handleUpdateData}>
                                    <Check/>
                                </IconButton>
                            ) : (
                                <IconButton onClick={handleEditData}>
                                    <Edit/>
                                </IconButton>
                            )}
                        </Box>
                        {['first_name', 'last_name', 'email', 'username'].map(key => (
                            <TextField
                                key={key}
                                margin="normal"
                                fullWidth
                                label={translatedLabels[key]}
                                name={key}
                                value={edit ? editedData[key] : user[key]}
                                onChange={handleUserChange}
                                disabled={!edit}
                            />
                        ))}
                        {car ? (
                            <Box component={Paper} sx={{mt: 2, p: 2}}>
                                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2}}>
                                    <DriveEta sx={{fontSize: 40, mr: 2}}/>
                                    <Typography variant="h5" sx={{mr: 2}}>Mój samochód</Typography>
                                    <IconButton onClick={handleEditCar}>
                                        <Edit/>
                                    </IconButton>
                                    <IconButton onClick={handleDeleteCar} color="error">
                                        <Delete/>
                                    </IconButton>
                                </Box>
                                <Grid container spacing={2}>
                                    {Object.entries(car).map(([key, value]) => (
                                        key !== 'user' &&
                                        <Grid item xs={6} key={key}>
                                        <Typography variant="subtitle1" component="div">
                                            <strong>{translatedLabels[key]}</strong>
                                        </Typography>
                                        <Typography variant="body1" component="div">{value}</Typography>
                                    </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        ) : (
                            <Button
                                sx={{mt: 2}}
                                variant="contained"
                                onClick={handleAddCar}
                            >
                                Dodaj samochód
                            </Button>
                        )}
                    </Box>
                </Container>
                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle>{car ? 'Edit Car' : 'Dodaj samochód'}</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Numer rejestracyjny"
                            name="license_plate"
                            value={newCar.license_plate}
                            onChange={handleCarChange}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Marka"
                            name="brand"
                            value={newCar.brand}
                            onChange={handleCarChange}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Model"
                            name="model"
                            value={newCar.model}
                            onChange={handleCarChange}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Generacja"
                            name="generation"
                            value={newCar.generation}
                            onChange={handleCarChange}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Rok produkcji"
                            name="year"
                            value={newCar.year}
                            onChange={handleCarChange}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Rodzaj paliwa"
                            name="fuel"
                            value={newCar.fuel}
                            onChange={handleCarChange}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Spalanie"
                            name="fuel_consumption"
                            value={newCar.fuel_consumption}
                            onChange={handleCarChange}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Pojemność"
                            name="capacity"
                            value={newCar.capacity}
                            onChange={handleCarChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Zamknij</Button>
                        {car ? (
                            <Button onClick={handleUpdateCar} color="primary">Zapisz zmiany</Button>
                        ) : (
                            <Button onClick={handleSaveCar} color="primary">Zapisz</Button>
                        )}
                    </DialogActions>
                </Dialog>
                <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                    <Alert onClose={handleSnackbarClose} severity={snackbarMessage.includes('pomyślnie') ? 'success' : 'error'} sx={{width: '100%'}}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
                <Footer></Footer>
            </Box>
        </div>
    );
};

export default Profile;
