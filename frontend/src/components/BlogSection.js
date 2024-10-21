import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";

const BlogSection = () => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetch(`${apiUrl}/content/article/`)
            .then(response => response.json())
            .then(data => setArticles(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <section id="blog" className="blog-area pb-90">
            <div className="row">
                {articles.slice(0, 2).map((article) => (
                    <div className="col-lg-6 col-md-6 d-flex align-items-stretch" key={article.id}>
                        <div className="single-blog-post mb-30 d-flex flex-column">
                            <div className="b-post-thumb">
                                <a href={`/articles/${article.id}`}>
                                    <div className="article-img-container">
                                        <img src={article.image} alt="img" className="article-img"/>
                                    </div>
                                </a>
                            </div>
                            <div className="blog-content mt-auto">
                                <span>{article.created_at}</span>
                                <h3><a href={`/articles/${article.id}`}>{article.title}</a></h3>
                                <p>{article.short_text}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center">
                <Link to={`/blog`}>All articles</Link>
            </div>
        </section>
    );
};

export default BlogSection;