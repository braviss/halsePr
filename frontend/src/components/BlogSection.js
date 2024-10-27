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

        <section className="Qnkx7f">
            <div className="pUdEWu">
                <div className="_dWo4q">
                    <div className="UQp4VY DFSA">
                        <p className="HlWZ7U DFDFD">Articles</p>
                        <Link to={`/blog`} className="article-link FGBa_b Hxy9LG lrRZA5 SkQjkL">View all</Link>
                    </div>
                    <div className="kkogA6 fsdkkogA6">
                        {articles.slice(0, 3).map((article) => (
                            <div className="bndDFDX F3oVwr" key={article.slug}>
                                <div className="OdujuB dsDFD">
                                    <div className="img_article_wrapper">
                                        <img src={article.image} alt="img" className="article-img"/>
                                    </div>
                                    <div className="article_body">
                                        <h5 className="mb-0">{article.title}</h5>
                                        <p>{article.short_text}</p>
                                        <a href={`/articles/${article.slug}`} className="FGBa_b Hxy9LG lrRZA5 SkQjkL custom_btn_color">View</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </section>
    );
};

export default BlogSection;