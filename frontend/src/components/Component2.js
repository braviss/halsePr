import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {InputGroup, Form} from 'react-bootstrap';

const Component2 = ({onNext}) => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    const [formData, setFormData] = useState({name: '', email: '', sex: ''}); // Инициализация sex как пустая строка
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            setIsAuthenticated(true);
            onNext(); // Пропускаем шаг для авторизованных пользователей
        } else {
            // Загрузка данных временного пользователя из локального хранилища
            const savedName = localStorage.getItem('guestName');
            const savedEmail = localStorage.getItem('guestEmail');
            const savedSex = localStorage.getItem('guestSex');
            if (savedName || savedEmail || savedSex) {
                setFormData({
                    name: savedName || '',
                    email: savedEmail || '',
                    sex: savedSex || '' // Добавлено значение по умолчанию
                });
            }
        }
    }, [onNext]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        const newFormData = {...formData, [name]: value};
        setFormData(newFormData);

        // Сохраняем данные в локальное хранилище отдельно
        localStorage.setItem(`guest${name.charAt(0).toUpperCase() + name.slice(1)}`, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!isAuthenticated) {
                const response = await axios.post(`${apiUrl}/users/create_temporary_user/`, formData);
                console.log("Temporary user created or exists:", response.data);
            }

            onNext();
        } catch (error) {
            console.error('Error sending user data:', error);
            setError('Error creating temporary user. Please try again.');
        }
    };

    const handleBlur = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Invalid email address');
        } else {
            setError('');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="col-md-auto">
                <div className="container mt-5">

                    {!isAuthenticated ? (
                        <form onSubmit={handleSubmit}>
                            <InputGroup className="mb-3">


                                <div className="d-flex justify-content-between mb-3">
                                    <div
                                        onClick={() => handleInputChange({target: {name: 'sex', value: 'Male'}})}
                                        style={{
                                            cursor: 'pointer',
                                            transition: '0.3s',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <img
                                            src="/img/icon/icons8-man-96.png" // Замените на путь к изображению для Male
                                            alt="Male"
                                            style={{
                                                width: '48px', // Ширина изображения
                                                height: '48px', // Высота изображения
                                                opacity: formData.sex === 'Male' ? 1 : 0.2 // Изменение прозрачности в зависимости от выбора
                                            }}
                                        />
                                    </div>
                                    <div
                                        onClick={() => handleInputChange({target: {name: 'sex', value: 'Female'}})}
                                        style={{
                                            cursor: 'pointer',
                                            transition: '0.3s',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <img
                                            src="/img/icon/icons8-woman-96.png" // Замените на путь к изображению для Female
                                            alt="Female"
                                            style={{
                                                width: '48px', // Ширина изображения
                                                height: '48px', // Высота изображения
                                                opacity: formData.sex === 'Female' ? 1 : 0.2 // Изменение прозрачности в зависимости от выбора
                                            }}
                                        />
                                    </div>
                                </div>


                                <Form.Control
                                    type="text"
                                    name="name"
                                    className="w-100 mb-3"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    aria-describedby="inputGroup-sizing-default"
                                    placeholder="Enter your name"
                                />
                                <Form.Control
                                    type="email"
                                    name="email"
                                    className="w-100"
                                    onBlur={handleBlur}
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    aria-describedby="inputGroup-sizing-default"
                                    placeholder="Enter your email"
                                />
                            </InputGroup>
                            {error && <p style={{color: 'red'}}>{error}</p>}
                            <button type="submit" className="btn-survey-start">
                                Next
                            </button>
                        </form>
                    ) : (
                        <p>User is already authenticated, skipping this step.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Component2;
