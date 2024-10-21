import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const BlogPage = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/content/article/')
            .then(response => setArticles(response.data))
            .catch(error => console.error('Error fetching articles:', error));
    }, []);

    return (
        <div>
            <Navbar />
            <section className="blog-area pt-4 pb-90">
                    <div className="row">
                        {articles.map(article => (
                            <div key={article.id} className="col-lg-12 col-md-12">
                                <div className="single-blog-post mb-30">
                                    <div className="b-post-thumb">
                                        <Link to={`/articles/${article.id}`}>
                                            {/*<img src={article.image} alt="Article" className="article-img"/>*/}
                                        </Link>
                                    </div>
                                    <div className="blog-content">
                                        <span>{article.created_at}</span>
                                        <h3><Link to={`/articles/${article.id}`}>{article.title}</Link></h3>
                                        <p>{article.short_text}</p>
                                        <Link to={`/articles/${article.id}`}>Read More</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
            </section>
        </div>
    );
};

export default BlogPage;
