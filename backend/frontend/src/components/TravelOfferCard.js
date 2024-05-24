import React, { useEffect, useState } from 'react';
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
import EmissionInfo from "./EmissionInfo";

const TravelOfferCard = ({ offer }) => {
    const { id, title, description, place_departure, place_arrival, price, date_departure, number_of_seats, user_id} = offer;
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
    const userData = JSON.parse(localStorage.getItem('user_data'));

    useEffect(() => {
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
            } catch (error) {
                console.error('Wystąpił błąd podczas pobierania rezerwacji:', error);
            }

        };

        fetchData().then(r => console.log('Pobrano rezerwacje'));
    }, [id]);

    const handleSeatToggle = async () => {
        if (reservationId) {
            try {
                const token = localStorage.getItem('access_token');
                await axios.delete(`http://localhost:8000/api/reservations/delete/${id}/`, {
                    headers: {
                        'Authorization': `JWT ${token}`,
                    }
                });
                setOccupiedSeats(occupiedSeats - 1);
                setReservationId(null);
            } catch (error) {
                console.error('Wystąpił błąd podczas usuwania rezerwacji:', error);
            }
        } else {
            if (occupiedSeats < totalSeats) {
                setOccupiedSeats(occupiedSeats + 1);
                try {
                    const userData = JSON.parse(localStorage.getItem('user_data'));
                    const token = localStorage.getItem('access_token');
                    const userId = userData.id;
                    await axios.post(`http://localhost:8000/api/reservations/add/`, { travel_id: id, user_id: userId }, {
                        headers: {
                            'Authorization': `JWT ${token}`,
                        }
                    });
                    setReservationId(id);
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
                seats.push(<PersonIcon key={i} fontSize="large" />);
            } else {
                seats.push(<PersonOutlineIcon key={i} fontSize="large" />);
            }
        }
        if (reservationId) {
            seats.push(
                <IconButton onClick={handleSeatToggle}>
                    <DeleteIcon fontSize="large" />
                </IconButton>
            );
        } else {
            seats.push(
                <IconButton onClick={handleSeatToggle} disabled={userData.id === user_id}>
                    <AddIcon fontSize="large" />
                </IconButton>
            );
        }
        return seats;
    };

    return (
        <Card raised sx={{ borderRadius: '10px' }}>
            <CardContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
                        Id użytkownika: {user_id}
                    </Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {renderSeats()}
                </div>
            </CardContent>
            <GoogleMapDisplay origin={place_departure} destination={place_arrival} />
        </Card>
    );
};

export default TravelOfferCard;
