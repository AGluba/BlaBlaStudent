import React from 'react';
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from './containers/Home'
import Login from './containers/Login'
import Activate from './containers/Activate'
import Reset from './containers/ResetPassword'
import Signup from './containers/Signup'

import Layout from "./hocs/Layout";
import ResetPassword from "./containers/ResetPassword";

const App = () => (
    <Router>
        <Layout>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/password/reset/confirm/:uid/:token' component={Reset} />
                <Route exact path='/activate/:uid/:token' component={Activate} />
                <Route exact path='/signup' component={Signup} />
            </Switch>
        </Layout>
    </Router>
);

export default App;