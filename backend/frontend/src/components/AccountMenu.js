import React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import PersonIcon from '@mui/icons-material/Person';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import Tooltip from '@mui/material/Tooltip';
import {Link, useNavigate} from 'react-router-dom';

export default function AccountMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const storedUser = JSON.parse(localStorage.getItem('user_data'));
    const firstLetter = storedUser?.first_name ? storedUser.first_name.charAt(0) : '';
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('user_data');
        navigate('/');
    };

    return (
        <div>
            <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ml: 2}}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{width: 40, height: 40, backgroundColor: '#43a047'}}>{firstLetter}</Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                sx={{
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                }}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >
                {storedUser ? (
                    <>
                        <MenuItem component={Link} to="/profile">
                            <PersonIcon sx={{marginRight: 1}}></PersonIcon> Mój profil
                        </MenuItem>
                        <MenuItem component={Link} to="/my-offers">
                            <LocalOfferIcon sx={{marginRight: 1}}></LocalOfferIcon> Moje oferty
                        </MenuItem>
                        <MenuItem component={Link} to="/my-travels">
                            <CardTravelIcon sx={{marginRight: 1}}></CardTravelIcon> Moje podróże
                        </MenuItem>
                        <Divider/>
                        <MenuItem onClick={handleLogout}>
                            <LogoutIcon sx={{marginRight: 1}}></LogoutIcon> Wyloguj się
                        </MenuItem>
                    </>
                ) : (
                    <>
                        <MenuItem component={Link} to='/login' sx={{textAlign: 'center'}}>
                            <LoginIcon sx={{marginRight: 1}}></LoginIcon> Zaloguj się
                        </MenuItem>
                        <MenuItem component={Link} to='/register' sx={{textAlign: 'center'}}>
                            <AppRegistrationIcon sx={{marginRight: 1}}></AppRegistrationIcon> Zarejestruj się
                        </MenuItem>
                    </>
                )}
            </Menu>
        </div>
    );
}
