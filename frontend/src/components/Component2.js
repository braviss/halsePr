import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {InputGroup, Form} from 'react-bootstrap';

const Component2 = ({onNext}) => {
    const [formData, setFormData] = useState({name: '', email: ''});
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('formData'));
        if (savedData) {
            setFormData(savedData);
        }
    }, []);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        const newFormData = {...formData, [name]: value};
        setFormData(newFormData);
        localStorage.setItem('formData', JSON.stringify(newFormData));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/create_client/', formData);
            onNext();
        } catch (error) {
            console.error('Error sending user data:', error);
        }
    };

    const handleBlur = () => {
        // Простая валидация email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Invalid email address');
        } else {
            setError('');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="container-md">
                <h1>Step 2</h1>

                <form onSubmit={handleSubmit}>
                    <InputGroup className="mb-3">
                        <Form.Control
                            type="text"
                            name="name"
                            className="w-100 mb-3"
                            value={formData.name}
                            onChange={handleInputChange}
                            aria-describedby="inputGroup-sizing-default"
                        />
                        <Form.Control
                            type="email"
                            name="email"
                            className="w-100"
                            onBlur={handleBlur}
                            value={formData.email}
                            onChange={handleInputChange}
                            aria-describedby="inputGroup-sizing-default"
                        />
                    </InputGroup>
                </form>

                {error && <p style={{color: 'red'}}>{error}</p>}

                <button onClick={handleSubmit} className="btn-survey-start">Next</button>
            </div>
        </div>
    );
};

export default Component2;