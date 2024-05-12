import React, { useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import EnergySavingsLeafOutlinedIcon from '@mui/icons-material/EnergySavingsLeafOutlined';
import { Typography } from "@mui/material";

export default function EmissionInfo() {
    const [open, setOpen] = React.useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Snackbar open={open}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                  style={{position: 'absolute', top: '25%'}}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <EnergySavingsLeafOutlinedIcon color='secondary'sx={{ fontSize: 250}} />
                <Typography variant="h4" gutterBottom>Wyemitowałeś o 45g/km mniej CO2,</Typography>
                <Typography variant="h4" gutterBottom>niż w przypadku podróży samemu!</Typography>
            </div>
        </Snackbar>
    );
}