import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const TravelOfferCard = ({ offer }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {offer.title}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {offer.date_departure} - {offer.place_departure} to {offer.place_arrival}
        </Typography>
        <Typography variant="body2" component="p">
          {offer.description}
        </Typography>
        <Typography variant="h6" component="p">
          Cena: {offer.price} zł
        </Typography>
        <Typography variant="h6" component="p">
          Liczba miejsc: {offer.number_of_seats}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TravelOfferCard;