import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import GoogleMapDisplay from './GoogleMapDisplay';

const TravelOfferCard = ({ offer }) => {
  const { title, description, place_departure, place_arrival } = offer;

  return (
    <Card raised>
      <CardContent>
        <Typography variant="h5" component="div">{title}</Typography>
        <Typography color="textSecondary" gutterBottom>{description}</Typography>
        <Typography variant="body2" color="textSecondary">
          Wyjazd: {place_departure}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Przyjazd: {place_arrival}
        </Typography>
        <GoogleMapDisplay origin={place_departure} destination={place_arrival} />
      </CardContent>
    </Card>
  );
};

export default TravelOfferCard;
