import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveUser } from '../redux/userSlice';
import Header from '../components/Header';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        try {
            const response = await axios.post('https://todo-backend-rbvn.onrender.com/user/login', {
                email,
                password
            });

            const { token, user } = response.data;

            localStorage.setItem('token', token);

            dispatch(saveUser(user));
            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
            if (error.response?.status === 401) {
                setErrorMsg('Invalid email or password');
            } else {
                setErrorMsg('Something went wrong. Please try again.');
            }
        }
    };

    return (
        <>
            <Header />
            <div className="container mt-5" style={{ maxWidth: '400px' }}>
                <h2 className="mb-4">Login</h2>
                {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>
                </form>
                <div className="d-flex flex-row align-items-start mt-5">
                    <p>Not a member? Sign up now!</p>
                    <Link to="/register">
                        <button className="btn btn-light text-primary border fw-semibold fs-5 ms-3">
                            Sign Up
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Login;
