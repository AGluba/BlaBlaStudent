import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
    }
};

export default Login;