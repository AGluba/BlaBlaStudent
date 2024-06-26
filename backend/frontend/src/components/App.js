import React, {Component} from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Routes, Link, Redirect} from 'react-router-dom';
import HomePage from './HomePage';
import Register from "./Register";
import Login from "./Login";
import Profile from "./Profile";
import ResetPassword from "./ResetPassword";
import TypeNewPassword from "./TypeNewPassword";
import AccountActivation from './AccountActivation';
import RegistrationConfirmation from './RegistrationConfirmation';
import CreateOfferForm from './CreateOffer';
import SearchTravelOffersForm from './SearchTravelOffersForm';
import MyOffersPage from './MyOffersPage';
import EditOfferPage from "./EditOfferPage";
import OfferDetailsPage from "./OfferDetailsPage";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import MyTravelsPage from "./MyTravelsPage";

const theme = createTheme(
    {
        palette: {
            primary: {
                main: '#388e3c',
            },
            secondary: {
                main: '#43a047',
            },
        },
    });

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/reset_password" element={<ResetPassword/>}/>
                    <Route path='/profile' element={<Profile/>}/>
                    <Route path="/registration-confirmation" element={<RegistrationConfirmation/>}/>
                    <Route path="/activation-success" element={<AccountActivation/>}/>
                    <Route path="/offers" element={<CreateOfferForm/>}/>
                    <Route path="/offers/search" element={<SearchTravelOffersForm/>}/>
                    <Route path="/my-offers" element={<MyOffersPage/>}/>
                    <Route path="/auth/reset-password/:uid/:token" element={<TypeNewPassword />} />
                    <Route path="offers/edit/:id" element={<EditOfferPage/>}/>
                    <Route path='offers/:id' element={<OfferDetailsPage/>}/>
                    <Route path='my-travels' element={<MyTravelsPage/>}/>
                </Routes>
            </Router>
        </ThemeProvider>
    );
};


export default App;

const appDiv = document.getElementById("app");
render(<App/>, appDiv);