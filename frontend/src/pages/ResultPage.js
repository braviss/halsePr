import React, {useEffect, useState} from 'react';
import BlogSection from "../components/BlogSection";
import FaqSection from "../components/FaqSection";
import Navbar from "../components/Navbar";
// import '../styles/main.scss';
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";

function ResultPage() {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    const [formData, setFormData] = useState({name: '', email: ''});
    const [blockScores, setBlockScores] = useState([]);
    const [totalScore, setTotalScore] = useState(0);
    const [lowestScoreBlock, setLowestScoreBlock] = useState(null);
    const [products, setProducts] = useState([]);

    const navigate = useNavigate();


    useEffect(() => {
        // Извлекаем имя и email из localStorage
        const guestName = localStorage.getItem('guestName');
        const guestEmail = localStorage.getItem('guestEmail');
        if (guestName && guestEmail) {
            setFormData({name: guestName, email: guestEmail});
        }

        // Получение баллов для блоков из localStorage
        const savedBlockScores = JSON.parse(localStorage.getItem('blockScores'));
        if (savedBlockScores) {
            setBlockScores(savedBlockScores);
        }

        // Получение общего балла из localStorage
        const savedTotalScore = localStorage.getItem('totalScore');
        if (savedTotalScore) {
            setTotalScore(Number(savedTotalScore));
        }

        // Получение блока с самым низким баллом из localStorage
        const savedLowestScoreBlock = JSON.parse(localStorage.getItem('lowestScoreBlock'));
        if (savedLowestScoreBlock) {
            setLowestScoreBlock(savedLowestScoreBlock);

            axios.get(`${apiUrl}/api/block/${savedLowestScoreBlock.id}/products/`)
                .then(response => {
                    setProducts(response.data);
                })
                .catch(error => {
                    console.error('Error fetching products:', error);
                });
        }
    }, []);

    const calculatePercentage = (score) => {
        return totalScore ? Math.ceil((score / totalScore) * 100 + 10) : 0;
    };



    const handleBuyProduct = (product) => {
        navigate('/order', {state: {product}});
    };

    return (
        <div>
            <Navbar/>

            <div className="btn btn-primary m-0 border-none float-end">
                <Link to="/survey" className="nav-link auth-link">Пройти повторний опрос</Link>
            </div>

            <h1>Результаты {formData.name}</h1>
            <div className="row">
                {blockScores.map((block, index) => {
                    const percentage = calculatePercentage(block.score);
                    return (

                        <div key={index} className="col-md-4">

                            <div className="mt-2">

                                <div className="progress-container-result">
                                    <h5>{block.description}</h5>
                                    <div
                                        className="progress-bar-result"
                                        role="progressbar"
                                        style={{width: '100%'}}
                                        aria-valuenow={percentage}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    >
                                        <div
                                            className="progress-mark"
                                            style={{left: `${percentage}%`}}
                                        >
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>


                    );
                })}
            </div>

            {lowestScoreBlock && (
                <div className="mt-4">
                    <h3>Блок с самым низким баллом: {lowestScoreBlock.block}</h3>

                    {products.length > 0 ? (
                        <div className="row">
                            {products.map(product => (

                                <div className="col-md-4">
                                    <div className="card mb-4 rounded-3 shadow-sm">
                                        <div className="card-header py-3">
                                            <h4 className="my-0 fw-normal">{product.tag}</h4>
                                        </div>
                                        <div className="card-body">
                                            <h1 className="card-title pricing-card-title">${product.price}</h1>
                                            <ul className="list-unstyled mt-3 mb-4">
                                                <li>{product.name}</li>
                                                <li>{product.description}</li>
                                            </ul>
                                            <button
                                                type="button"
                                                className="w-100 border-none btn btn-lg btn-primary"
                                                onClick={() => handleBuyProduct(product)}
                                            >
                                                Buy
                                            </button>
                                            <Link to={`/products/${product.id}`}>Подробнее</Link>
                                        </div>
                                    </div>
                                </div>


                            ))}

                        </div>

                    ) : (
                        <p>Нет доступных продуктов для этого блока.</p>
                    )}


                </div>
            )}

            <FaqSection/>
            <BlogSection/>
        </div>
    );
}

export default ResultPage;
