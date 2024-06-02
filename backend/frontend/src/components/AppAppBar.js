import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {
    AppBar,
    Toolbar,
    IconButton,
    Badge,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Popover
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import AccountMenu from "./AccountMenu";
import NotificationsIcon from '@mui/icons-material/Notifications';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import logo from '../../static/images/logo_blablas.png';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {Check} from "@mui/icons-material";

export default function AppAppBar() {
    const storedUser = JSON.parse(localStorage.getItem('user_data'));
    const [anchorEl, setAnchorEl] = useState(null);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const userId = storedUser.id;
                const token = localStorage.getItem('access_token');
                const response = await axios.get(`http://localhost:8000/api/notification/${userId}/`, {
                    headers: {
                        'Authorization': `JWT ${token}`,
                    }
                });
                const newNotifications = response.data;
                console.log(newNotifications);
                setNotifications(newNotifications);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };
        fetchNotifications();
        const interval = setInterval(() => {
            fetchNotifications()
        }, 10 * 1000)

        return () => clearInterval(interval);
    }, []);

    const handleNotificationsClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleNotificationsClose = () => {
        setAnchorEl(null);
    };

    const removeNotification = async (indexToRemove, notificationId) => {
        try {
            const token = localStorage.getItem('access_token');
            await axios.patch(`http://localhost:8000/api/notification/update/${notificationId}/`, {is_read: true}, {
                headers: {
                    'Authorization': `JWT ${token}`,
                }
            });
            setNotifications(prevNotifications => {
                return prevNotifications.filter((_, index) => index !== indexToRemove);
            });
        } catch (error) {
            console.error("Error updating notification:", error);
        }
    };

    const open = Boolean(anchorEl);
    const id = open ? 'notifications-popover' : undefined;

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', padding: 1}}>
            <AppBar position="static" sx={{borderRadius: '10px'}}>
                <Toolbar>
                    <img src={logo} alt="logo" style={{width: '65px', height: '65px'}}/>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        BlaBlaS
                    </Typography>
                    <Button component={Link} to='/' color="inherit" sx={{borderRadius: '10px'}}>Strona główna</Button>
                    <Button component={Link} to='/offers/search' color="inherit"
                            sx={{borderRadius: '10px'}}>Szukaj</Button>
                    <Button component={Link} to={storedUser ? '/offers' : '/login'} color="inherit"
                            sx={{borderRadius: '10px'}}>
                        Dodaj ofertę
                    </Button>
                    {storedUser && (
                        <>
                            <IconButton color="inherit" onClick={handleNotificationsClick}>
                                <Badge badgeContent={notifications.length} color="error">
                                    <NotificationsIcon/>
                                </Badge>
                            </IconButton>
                            <Popover
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleNotificationsClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                style={{marginTop: '15px'}}
                            >
                                <List>
                                    {notifications.length === 0 ? (
                                        <ListItem onClick={handleNotificationsClose}>Brak powiadomień</ListItem>
                                    ) : (
                                        notifications.map((notification, index) => (
                                            <ListItem key={index} sx={{maxWidth: '500px', wordWrap: 'break-word'}}>
                                                <ListItemText primary={notification.message}/>
                                                <ListItemSecondaryAction>
                                                    {notification.is_offer ? (
                                                        <>
                                                            <IconButton edge="end"
                                                                        onClick={() => acceptOffer(notification.id)}>
                                                                <Check/>
                                                            </IconButton>
                                                            <IconButton edge="end"
                                                                        onClick={() => removeNotification(index, notification.id)}>
                                                                <CloseIcon/>
                                                            </IconButton>
                                                        </>
                                                    ) : (
                                                        <IconButton edge="end"
                                                                    onClick={() => removeNotification(index, notification.id)}>
                                                            <CloseIcon/>
                                                        </IconButton>
                                                    )}
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        ))
                                    )}
                                </List>

                            </Popover>
                        </>
                    )}
                    <AccountMenu/>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
