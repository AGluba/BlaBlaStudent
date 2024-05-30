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
import StopIcon from '@mui/icons-material/Stop';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const TravelOfferCard = ({offer}) => {
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
    const [showStopForm, setShowStopForm] = useState(false);
    const [stopLocation, setStopLocation] = useState('');
    const [stops, setStops] = useState([]);
    const userData = JSON.parse(localStorage.getItem('user_data'));

    useEffect(() => {
        fetchData().then(r => console.log('Pobrano rezerwacje'));
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
            } catch (error) {
                console.error('Wystąpił błąd podczas pobierania danych:', error);
            }
        };

     useEffect(() => {
        const fetchStops = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get(`http://localhost:8000/api/stop-requests/travel-offer/${id}/`, {
                    headers: {
                        'Authorization': `JWT ${token}`,
                    }
                });
                const acceptedStops = response.data.filter(stop => stop.is_accepted);
                setStops(acceptedStops);
            } catch (error) {
                console.error('Wystąpił błąd podczas pobierania przystanków:', error);
            }
        };

        fetchStops();
    }, [id]);

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

    const handleAddStopRequest = () => {
        setShowStopForm(true);
    };

    const handleStopFormSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('access_token');
        const requestData = {
            place_stop: stopLocation,
            user_id: userData.id,
            travel_offer_id: id,
            is_accepted: false,
            created_at: new Date().toISOString()
        };

        try {
            const response = await axios.post(`http://localhost:8000/api/offers/${id}/request-stop/`, requestData, {
                headers: {
                    'Authorization': `JWT ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            alert('Prośba o dodanie przystanku została wysłana.');
            setShowStopForm(false);
            setStopLocation('');
        } catch (error) {
            console.error('Wystąpił błąd podczas wysyłania prośby o dodanie przystanku:', error.response ? error.response.data : error.message);
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
                <IconButton key="delete" onClick={handleSeatToggle}>
                    <DeleteIcon fontSize="large"/>
                </IconButton>
            );
            seats.push(
                <IconButton onClick={handleAddStopRequest} key="stop">
                    <StopIcon fontSize="large" />
                </IconButton>
            );
        } else {
            seats.push(
                <IconButton key="add" onClick={handleSeatToggle} disabled={userData.id === user_id}>
                    <AddIcon fontSize="large"/>
                </IconButton>
            );
        }
        return seats;
    };

    return (
        <Card raised sx={{borderRadius: '10px'}}>
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
                <div style={{display: 'flex', alignItems: 'center'}}>
                    {renderSeats()}
                </div>
            </CardContent>
            {showStopForm && (
                <CardContent>
                    <form onSubmit={handleStopFormSubmit}>
                        <TextField
                            label="Lokalizacja przystanku"
                            value={stopLocation}
                            onChange={(e) => setStopLocation(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <Button type="submit" variant="contained" color="primary">
                            Wyślij prośbę
                        </Button>
                        <Button onClick={() => setShowStopForm(false)} variant="outlined" color="secondary" style={{ marginLeft: '10px' }}>
                            Anuluj
                        </Button>
                    </form>
                </CardContent>
            )}
            <GoogleMapDisplay origin={place_departure} destination={place_arrival}/>
        </Card>
    );
};

export default TravelOfferCard;
