import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Dashboard() {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Проверяем наличие токена и выполняем запрос к API для получения данных пользователя
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users/me/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        setUser(response.data);
      } catch (error) {
        // Если ошибка 401 (Unauthorized), перенаправляем на страницу логина
        if (error.response && error.response.status === 401) {
          navigate('/login');
        } else {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [navigate]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Navbar />
      <h1>Личный кабинет</h1>
      <p>Добро пожаловать, {user.username}!</p>
      <p>Email: {user.email}</p>
      <button onClick={() => navigate('/logout')}>Logout</button>
    </div>
  );
}

export default Dashboard;
