import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Navbar from "./Navbar";


function Register() {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/users/register/`, {
                username,
                email,
                password,
            });
            console.log('Registration successful', response.data);
            navigate('/login');
        } catch (error) {
            console.error('There was an error registering!', error);
        }
    };

    return (
        <div>
            <Navbar/>

            <form onSubmit={handleSubmit} className="form-signin">

                <div className="form-floating mb-2">
                    <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Username</label>

                </div>
                <div className="form-floating mb-2">
                    <input
                        type="email"
                        className="form-control"
                        id="floatingEmail"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="floatingEmail">Email</label>
                </div>

                <div className="form-floating mb-2">

                    <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <label htmlFor="floatingPassword">Password</label>
                </div>

                <button className="w-100 btn btn-lg btn-primary border-none" type="submit">Sign up</button>
            </form>


        </div>
    );
}

export default Register;
