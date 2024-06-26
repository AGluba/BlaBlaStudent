import React, {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import GoogleMapDisplay from './GoogleMapDisplay';
import IconButton from '@mui/material/IconButton';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Rating} from "@mui/material";

const TravelCard = ({offer}) => {
    const {
        id,
        title,
        description,
        place_departure,
        place_arrival,
        price,
        date_departure,
        number_of_seats,
        user_id
    } = offer;
    const departureDate = new Date(date_departure).toLocaleString('pl-PL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    const [occupiedSeats, setOccupiedSeats] = useState(0);
    const [totalSeats] = useState(number_of_seats);
    const [reservationId, setReservationId] = useState(null);
    const [username, setUsername] = useState('');
    const userData = JSON.parse(localStorage.getItem('user_data'));
    const cardStyle = offer.status ? {} : {opacity: '0.5'};
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleRatingChange = (event, newValue) => {
        setRating(newValue);
    }

    useEffect(() => {
        fetchData();
    }, [id, user_id, userData.id]);

     const fetchData = async () => {
            try {
                const token = localStorage.getItem('access_token');

                const response = await axios.get(`http://localhost:8000/api/reservations/${id}/`, {
                    headers: {
                        'Authorization': `JWT ${token}`,
                    }
                });
                const reservations = response.data;
                const userId = userData.id;
                const userReservation = reservations.find(reservation => reservation.user_id === userId);
                setOccupiedSeats(reservations.length);
                if (userReservation) {
                    setReservationId(userReservation.id);
                }

                const userResponse = await axios.get(`http://localhost:8000/api/users/${user_id}/`, {
                    headers: {
                        'Authorization': `JWT ${token}`,
                    }
                });
                setUsername(userResponse.data.username);
                console.log(cardStyle);
            } catch (error) {
                console.error('Wystąpił błąd podczas pobierania danych:', error);
            }
        };

    const handleSeatToggle = async () => {
        if (reservationId) {
            try {
                const token = localStorage.getItem('access_token');
                await axios.delete(`http://localhost:8000/api/reservations/delete/${reservationId}/`, {
                    headers: {
                        'Authorization': `JWT ${token}`,
                    }
                });
                setOccupiedSeats(occupiedSeats - 1);
                setReservationId(null);
                fetchData();
            } catch (error) {
                console.error('Wystąpił błąd podczas usuwania rezerwacji:', error);
            }
        } else {
            if (occupiedSeats < totalSeats) {
                try {
                    const token = localStorage.getItem('access_token');
                    const userId = userData.id;
                    const response = await axios.post(`http://localhost:8000/api/reservations/add/`, {
                        travel_id: id,
                        user_id: userId
                    }, {
                        headers: {
                            'Authorization': `JWT ${token}`,
                        }
                    });
                    setReservationId(response.data.id);
                    setOccupiedSeats(occupiedSeats + 1);
                    fetchData();
                } catch (error) {
                    console.error('Wystąpił błąd podczas dodawania rezerwacji:', error);
                }
            }
        }
    };

    const renderSeats = () => {
        const seats = [];
        for (let i = 0; i < totalSeats; i++) {
            if (i < occupiedSeats) {
                seats.push(<PersonIcon key={i} fontSize="large"/>);
            } else {
                seats.push(<PersonOutlineIcon key={i} fontSize="large"/>);
            }
        }
        if (reservationId) {
            seats.push(
                <IconButton key="delete" onClick={handleSeatToggle} disabled={!offer.status}>
                    <DeleteIcon fontSize="large"/>
                </IconButton>
            );
        } else {
            seats.push(
                <IconButton key="add" onClick={handleSeatToggle} disabled={userData.id === user_id || !offer.status}>
                    <AddIcon fontSize="large"/>
                </IconButton>
            );
        }
        return seats;
    };

    return (
        <Card raised sx={{borderRadius: '10px', ...cardStyle}}>
            <CardContent style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <div>
                    <Typography variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                        Opis: {description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Miejsce wyjazdu: {place_departure}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Miejsce docelowe: {place_arrival}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Data wyjazdu: {departureDate}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Cena: {price.toFixed(2)} zł
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Użytkownik: {username}
                    </Typography>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>
                        {renderSeats()}
                    </div>
                    <div>
                        <Button variant="outlined" onClick={handleClickOpen}>
                            Oceń
                        </Button>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle style={{textAlign: 'center'}}>Oceń kierowcę</DialogTitle>
                            <DialogContent style={{textAlign: 'center'}}>
                                <DialogContentText>
                                    Proszę ocenić kierowcę w skali od 1 do 5.
                                </DialogContentText>
                                <Rating
                                    name="simple-controlled"
                                    value={rating}
                                    onChange={handleRatingChange}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>
                                    Anuluj
                                </Button>
                                <Button onClick={handleClose}>
                                    Potwierdź
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default TravelCard;
