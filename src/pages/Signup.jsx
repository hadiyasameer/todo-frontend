import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveUser } from '../redux/userSlice';
import Header from '../components/Header';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignup = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        try {
            const response = await axios.post('https://todo-backend-rbvn.onrender.com/user/register', { email, password }, { withCredentials: true });

            const { token, user } = response.data;

            localStorage.setItem('token', token);
            dispatch(saveUser(user));

            navigate('/');
        } catch (error) {
            console.error('Signup error:', error);
            if (error.response?.data?.message) {
                setErrorMsg(error.response.data.message);
            } else {
                setErrorMsg('Something went wrong. Please try again.');
            }
        }
    };

    return (
        <>
        <Header/>
        <div className="container mt-5" style={{ maxWidth: '450px' }}>
            <h2 className="mb-4">Sign Up</h2>
            {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
            <form onSubmit={handleSignup}>
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
                    Sign Up
                </button>
            </form>

            <div className="d-flex flex-column align-items-start mt-4">
                <p>Already have an account?</p>
                <button className="btn btn-outline-primary" onClick={() => navigate('/login')}>
                    Login
                </button>
            </div>
        </div>
        </>
    );
}

export default Signup;
