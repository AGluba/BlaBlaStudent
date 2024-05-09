import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import React from "react";


export default function Footer() {
    return <footer>
        <Container sx={{textAlign: 'center', marginTop: '15vh'}}>
            <Typography variant="body2" color="text.secondary">
                {'Wszelkie prawa zastrzeżone © '}
                BlaBlaS&nbsp;
                {new Date().getFullYear()}
            </Typography>
        </Container>
    </footer>
}
