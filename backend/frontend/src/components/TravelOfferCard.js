import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import GoogleMapDisplay from './GoogleMapDisplay';

const TravelOfferCard = ({ offer }) => {
  const { title, description, place_departure, place_arrival, price, date_departure } = offer;
  const departureDate = new Date(date_departure).toLocaleString('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <Card raised>
      <CardContent>
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
        <GoogleMapDisplay origin={place_departure} destination={place_arrival} />
      </CardContent>
    </Card>
  );
};

export default TravelOfferCard;
