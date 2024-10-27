import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";

const BlogPage = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/content/article/')
            .then(response => {
                const filteredArticles = response.data.filter(article => article.type === 'a');
                setArticles(filteredArticles);
            })
            .catch(error => console.error('Error fetching articles:', error));
    }, []);


    const breadcrumbs = [
        {label: 'Home', path: '/'},
        {label: 'Blog', path: ''}
    ];

    return (
        <div className="DDbrqN vgsMax">
            <Navbar/>

            <section className="QB2rhE">
                <div className="j4XGWX">
                    <div className="XiPxXu"><p className="wOsFmC">Articles</p>
                    </div>
                </div>
            </section>
            <section className="Qnkx7f" style={{
                background: 'none',
            }}>
                <div className="pUdEWu">
                    <Breadcrumbs items={breadcrumbs}/>
                    <div className="_dWo4q">
                        <div className="kkogA6 dsfsdd">
                            {articles.map(article => (
                                <div className="bndDFDX F3oVwr">
                                    <div className="OdujuB dsDFD">
                                        <div className="img_article_wrapper">
                                            <img src={article.image} alt="img" className="article-img"/>
                                        </div>
                                        <div className="article_body">
                                            <h5 className="mb-0">{article.title}</h5>
                                            <p>{article.short_text}</p>
                                            <a href={`/articles/${article.slug}`}
                                               className="FGBa_b Hxy9LG lrRZA5 SkQjkL custom_btn_color">View</a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </section>
            <Footer/>

        </div>
    );
};

export default BlogPage;
