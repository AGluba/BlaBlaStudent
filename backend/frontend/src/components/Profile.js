import React, {useState, useEffect} from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    TextField,
    Box,
    Snackbar,
    Alert,
    createTheme,
    ThemeProvider,
    CssBaseline
} from '@mui/material';
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
    }, []);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setUser(prevState => ({...prevState, [name]: value}));
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put('http://localhost:8000/api/user/update/', {
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
                console.log(error);
                setSnackbarMessage('Failed to update profile: Unauthorized');
            } else {
                console.error('Failed to update profile', error);
                setSnackbarMessage('Failed to update profile');
            }
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
        <div>
            <CssBaseline/>
            <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
                <AppAppBar></AppAppBar>
                <Container component="main" maxWidth="sm">
                    <Box sx={{mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
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
                        <Button
                            sx={{mt: 2}}
                            variant="contained"
                            color="secondary"
                            onClick={edit ? handleUpdate : () => setEdit(true)}
                        >
                            {edit ? 'Save Changes' : 'Edit Profile'}
                        </Button>
                    </Box>
                </Container>
                <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                    <Alert onClose={handleSnackbarClose} severity="info" sx={{width: '100%'}}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
                <Footer></Footer>
            </Box>
        </div>
    );
};

export default Profile;