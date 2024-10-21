import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import Navbar from "../components/Navbar";

function OrderPage() {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const location = useLocation();
    const {product} = location.state || {};

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone_number: '',
        address: ''
    });

    const [message, setMessage] = useState('');

    useEffect(() => {
        const name = localStorage.getItem('guestName');
        const email = localStorage.getItem('guestEmail');
        const phoneNumber = localStorage.getItem('guestPhoneNumber') || '';

        setFormData((prevData) => ({
            ...prevData,
            name: name || '',
            email: email || '',
            phone_number: phoneNumber,
        }));
    }, []);

    const handleInputChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const orderData = {
                temporary_user_name: formData.name,
                temporary_user_email: formData.email,
                phone_number: formData.phone_number,
                address: formData.address,
                product_name: product.name,
                product_price: product.price,
            };

            const response = await axios.post(`${apiUrl}/api/orders/`, orderData);
            if (response.status === 201) {
                setMessage(`Заказ успешно оформлен! Номер вашего заказа: ${response.data.order_number}`);
            }
        } catch (error) {
            console.error('Ошибка при создании заказа:', error);
            setMessage('Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте еще раз.');
        }
    };

    if (!product) {
        return <p>Продукт не найден. Пожалуйста, вернитесь на страницу результатов.</p>;
    }

    return (
        <div>
            <Navbar/>

            <h1>Оформление заказа на {product.name}</h1>
            <p>Цена: ${product.price}</p>
            <p>Описание: {product.description}</p>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Имя</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone_number" className="form-label">Номер телефона</label>
                    <input
                        type="text"
                        id="phone_number"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Адрес</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">Подтвердить заказ</button>
            </form>

            {message && <p>{message}</p>} {/* Показываем сообщение о результате */}
        </div>
    );
}

export default OrderPage;
