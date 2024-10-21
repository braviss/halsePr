// ProductDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetail() {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const { productId } = useParams(); // Получаем ID продукта из URL
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Загружаем данные о продукте по ID
        axios.get(`${apiUrl}/api/products/${productId}/`)
            .then(response => setProduct(response.data))
            .catch(error => console.error('Ошибка при загрузке продукта:', error));
    }, [productId]);

    if (!product) {
        return <p>Загрузка...</p>;
    }

    return (
        <div>
            <h1>{product.name}</h1>
            <p>Цена: ${product.price}</p>
            <p>Описание: {product.description}</p>
        </div>
    );
}

export default ProductDetail;
