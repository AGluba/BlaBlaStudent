import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import GoogleMapDisplay from './GoogleMapDisplay';
import IconButton from '@mui/material/IconButton';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';

const TravelOfferCard = ({ offer }) => {
  const { title, description, place_departure, place_arrival, price, date_departure } = offer;
  const departureDate = new Date(date_departure).toLocaleString('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const [occupiedSeats, setOccupiedSeats] = useState(0);
  const [totalSeats] = useState(10); // Total number of seats available

  const handleSeatToggle = () => {
    if (occupiedSeats < totalSeats) {
      setOccupiedSeats(occupiedSeats + 1);
    } else {
      setOccupiedSeats(0);
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
    return seats;
  };

  return (
    <Card raised>
      <CardContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <Typography variant="h5" component="div">{title}</Typography>
          <Typography color="textSecondary" gutterBottom>{description}</Typography>
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
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {renderSeats()}
          <IconButton onClick={handleSeatToggle}>
            <AddIcon fontSize="large" />
          </IconButton>
        </div>
      </CardContent>
      <GoogleMapDisplay origin={place_departure} destination={place_arrival} />
    </Card>
  );
};

export default TravelOfferCard;
