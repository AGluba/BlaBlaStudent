import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom";

const TravelOfferCard = ({offer}) => {
    const departureDate = new Date(offer.date_departure).toLocaleString([], {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    return (
        <Link to={`/offers/${offer.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
            <Card>
                <CardContent>
                    <Typography variant="h6" component="p">
                        Miejsce wyjazdu: {offer.place_departure}
                    </Typography>
                    <Typography variant="h6" component="p">
                        Miejsce docelowe: {offer.place_arrival}
                    </Typography>
                    <Typography variant="h6" component="p">
                        Data wyjazdu: {departureDate}
                    </Typography>
                    <Typography variant="h6" component="p">
                        Cena: {offer.price} zł
                    </Typography>
                    <Typography variant="h6" component="p">
                        Liczba miejsc: {offer.number_of_seats}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    );
};

export default TravelOfferCard;
