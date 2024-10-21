import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const ArticlePage = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8000/content/article/${id}/`)
            .then(response => setArticle(response.data))
            .catch(error => console.error('Error fetching article:', error));
    }, [id]);

    if (!article) return <p>Loading...</p>;

    return (
        <div>
            <Navbar />
            <section className="article-details">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="article-content">
                                <h1>{article.title}</h1>
                                <img src={article.image} alt="Article" className="article-img"/>
                                <p>{article.text}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ArticlePage;
