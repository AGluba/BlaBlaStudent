import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Link, Redirect } from 'react-router-dom';
import HomePage from './HomePage';
import Register from "./Register";
import Login from "./Login";
import Profile from "./Profile";
import AccountActivation from './AccountActivation';
import RegistrationConfirmation from './RegistrationConfirmation';
import CreateOfferForm from './CreateOffer';
import SearchTravelOffersForm from './SearchTravelOffersForm';



const App = () => {
  return (
      <Router>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path='/profile' element={<Profile />} />
            <Route path="/registration-confirmation" element={<RegistrationConfirmation/>} />
            <Route path="/activation-success" element={<AccountActivation />} />
            <Route path="/add-offers" element={<CreateOfferForm />} />
            <Route path="/offers/search" element={<SearchTravelOffersForm />} />
        </Routes>
      </Router>
  );
};


export default App;

const appDiv = document.getElementById("app");
render(<App />, appDiv);