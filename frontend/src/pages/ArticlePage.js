import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/Footer";

const ArticlePage = () => {
    const {slug} = useParams();
    const [article, setArticle] = useState(null);


    useEffect(() => {
        axios.get(`http://localhost:8000/content/article/${slug}/`)
            .then(response => setArticle(response.data))
            .catch(error => console.error('Error fetching article:', error));
    }, [slug]);


    if (!article) return <p>Loading...</p>;

    const breadcrumbs = [
        {label: 'Home', path: '/'},
        {label: 'Articles', path: '/blog'},
        {label: article.title, path: ''}
    ];

    return (
        <div className="DDbrqN vgsMax">
            <div className="FtzZyQ">
                <Navbar/>

                <section className="QB2rhE">
                    <div className="j4XGWX">
                        <div className="XiPxXu"><p className="wOsFmC">{article.title}</p>
                        </div>
                    </div>
                </section>


                <div className="qrIC3r">
                    <div className="eF1ytf">
                        <Breadcrumbs items={breadcrumbs}/>
                        <div className="article-content">
                            {article.image && (
                                <img src={article.image} alt="Article" className="article-img"/>
                            )}
                            <div dangerouslySetInnerHTML={{__html: article.text}} style={{
                                marginTop: '25px',
                            }}/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ArticlePage;
