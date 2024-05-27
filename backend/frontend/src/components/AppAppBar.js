import React, { useEffect, useState } from 'react';
import Box from "@mui/material/Box";
import { AppBar, Toolbar, IconButton, Badge, List, ListItem, ListItemText, ListItemSecondaryAction, Menu } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import AccountMenu from "./AccountMenu";
import NotificationsIcon from '@mui/icons-material/Notifications';
import CloseIcon from '@mui/icons-material/Close';

export default function AppAppBar() {
    const storedUser = JSON.parse(localStorage.getItem('user_data'));
    const [anchorEl, setAnchorEl] = useState(null);
    const [notifications, setNotifications] = useState(() => {
        const storedNotifications = localStorage.getItem('notifications');
        return storedNotifications ? JSON.parse(storedNotifications) : [];
    });

    useEffect(() => {
        if (storedUser) {
            const token = localStorage.getItem('access_token');
            const ws = new WebSocket(`ws://localhost:8000/ws/notify/?token=${token}`);

            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                setNotifications((prevNotifications) => [...prevNotifications, data.message]);
            };

            return () => {
                ws.close();
            };
        }
    }, [storedUser]);

    const handleNotificationsClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleNotificationsClose = () => {
        setAnchorEl(null);
    };

    const removeNotification = (index) => {
        const updatedNotifications = [...notifications];
        updatedNotifications.splice(index, 1);
        localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
        setNotifications(updatedNotifications);
    };

    const open = Boolean(anchorEl);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: 1 }}>
            <AppBar position="static" sx={{ borderRadius: '10px' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        BlaBlaS
                    </Typography>
                    <Button component={Link} to='/' color="inherit" sx={{ borderRadius: '10px' }}>Strona główna</Button>
                    <Button component={Link} to='/offers/search' color="inherit" sx={{ borderRadius: '10px' }}>Szukaj</Button>
                    <Button component={Link} to={storedUser ? '/offers' : '/login'} color="inherit" sx={{ borderRadius: '10px' }}>
                        Dodaj ofertę
                    </Button>
                    {storedUser && (
                        <>
                            <IconButton color="inherit" onClick={handleNotificationsClick}>
                                <Badge badgeContent={notifications.length} color="error">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleNotificationsClose}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <List>
                                    {notifications.length === 0 ? (
                                        <ListItem onClick={handleNotificationsClose}>Brak powiadomień</ListItem>
                                    ) : (
                                        notifications.map((notification, index) => (
                                            <ListItem key={index} sx={{ maxWidth: '500px', wordWrap: 'break-word' }}>
                                                <ListItemText primary={notification} />
                                                <ListItemSecondaryAction>
                                                    <IconButton edge="end" onClick={() => removeNotification(index)}>
                                                        <CloseIcon />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        ))
                                    )}
                                </List>
                            </Menu>
                        </>
                    )}
                    <AccountMenu />
                </Toolbar>
            </AppBar>
        </Box>
    );
}
