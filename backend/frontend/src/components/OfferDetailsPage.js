import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Box } from '@mui/material';

const OfferDetailsPage = () => {
    const { id } = useParams();
    const [offer, setOffer] = useState(null);

    useEffect(() => {
        fetchOffer(id).then(r => {
        });
    }, [id]);

    const fetchOffer = async (id) => {
        try {
            const response = await axios.get(`/api/offers/${id}`);
            setOffer(response.data);
        } catch (error) {
            console.error('Błąd podczas pobierania oferty:', error);
        }
    };

    if (!offer) {
        return <Typography variant="h6">Ładowanie...</Typography>;
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>{offer.title}</Typography>
            <Box sx={{ marginTop: 2 }}>
                <Typography variant="h6">Miejsce wyjazdu: {offer.place_departure}</Typography>
                <Typography variant="h6">Miejsce docelowe: {offer.place_arrival}</Typography>
                <Typography variant="h6">Data wyjazdu: {new Date(offer.date_departure).toLocaleString()}</Typography>
                <Typography variant="h6">Cena: {offer.price} zł</Typography>
                <Typography variant="h6">Liczba miejsc: {offer.number_of_seats}</Typography>
                <Typography variant="h6">Opis: {offer.description}</Typography>
            </Box>
        </Container>
    );
};

export default OfferDetailsPage;