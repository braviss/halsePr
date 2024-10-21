import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Navbar from "./Navbar";

function Login() {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/users/login/`, {
                username,
                password,
            });
            // Сохраняем токены авторизации
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;


            const userId = response.data.user_id;
            console.log(userId);
            // Получаем user_id из ответа
            localStorage.setItem('user_id', userId); // Сохраняем его в localStorage
            console.log(response.data);

            // Очистка данных временного пользователя (если они есть)
            localStorage.removeItem('guestName');
            localStorage.removeItem('guestEmail');

            console.log('Login successful');
            navigate('/dashboard');
        } catch (error) {
            console.error('There was an error logging in!', error);
        }
    };

    return (
        <div>
            <Navbar/>

            <form onSubmit={handleSubmit} className="form-signin">

                <div className="form-floating mb-2">
                    <input type="text" className="form-control" id="floatingInput" placeholder="username"
                           value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <label htmlFor="floatingInput">Username</label>
                </div>
                <div className="form-floating mb-2">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                           value={password} onChange={(e) => setPassword(e.target.value)}/>

                    <label htmlFor="floatingPassword">Password</label>
                </div>

                <button className="w-100 btn btn-lg btn-primary border-none" type="submit">Sign in</button>
            </form>
        </div>
    );
}

export default Login;
