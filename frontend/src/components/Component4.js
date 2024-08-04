import React, {useState, useEffect} from 'react';
import {Col, Accordion, ProgressBar} from 'react-bootstrap';
import axios from 'axios';


const Component4 = () => {
    const [formData, setFormData] = useState({name: '', email: ''});
    const [lowestScoreBlock, setLowestScoreBlock] = useState(null);
    const [product, setProduct] = useState(null);
    const [blockScores, setBlockScores] = useState([]);
    const [totalScore, setTotalScore] = useState(0);
    const [qas, setQas] = useState([]);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const savedFormData = JSON.parse(localStorage.getItem('formData'));
        if (savedFormData) {
            setFormData(savedFormData);
        }
        const savedLowestScoreBlock = JSON.parse(localStorage.getItem('lowestScoreBlock'));

        if (savedLowestScoreBlock) {
            setLowestScoreBlock(savedLowestScoreBlock);

            const blockName = savedLowestScoreBlock.block;
            axios.get(`http://localhost:8000/api/get_product_for_block/${blockName}/`)
                .then(response => {

                    setProduct(response.data);
                })
                .catch(err => {
                    console.error("Error fetching blocks:", err);
                });
        }
        const savedBlockScores = JSON.parse(localStorage.getItem('blockScores'));
        if (savedBlockScores) {
            setBlockScores(savedBlockScores);
        }

        const savedTotalScore = localStorage.getItem('totalScore');
        if (savedTotalScore) {
            setTotalScore(Number(savedTotalScore));
        }
    }, []);


    useEffect(() => {
        fetch('http://localhost:8000/api/qa/')
            .then(response => response.json())
            .then(data => setQas(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:8000/api/article/')
            .then(response => response.json())
            .then(data => setArticles(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const percentage = totalScore ? ((lowestScoreBlock?.score || 0) / totalScore * 100).toFixed(2) : 0;


    return (

        <div>
            <section className="result-area pb-120">
                <div className="container">
                    {/*<div className="card">*/}
                    {/*    <div className="card-body">*/}
                    {/*        <div className="row">*/}
                    {/*            <div className="col-8">*/}
                    {/*                <div className="d-flex align-items-center h-100">*/}
                    {/*                    <h4 className="me-2 my-0">999$</h4>*/}
                    {/*                    <span*/}
                    {/*                        className="rounded bg-primary text-white px-4 h-100 d-flex align-items-center text-decoration-line-through">1200$</span>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*            <div className="col-4">*/}
                    {/*                <div className="btn btn-primary w-100 border-0">Заказать</div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className="mt-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-6">
                                    <div className="row">
                                        <div className="com-12 mb-2">
                                            <h1>{formData.name},</h1>
                                            <h3>ваш персональний курс витаминов уже готов</h3>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">

                                            {lowestScoreBlock && (
                                                <Col>
                                                    {product ? (
                                                        <div className="card mb-2">
                                                            <div className="card-body">
                                                                <h5 className="card-title">Ваш курс витамином направлен
                                                                    на
                                                                    здоровье {product.description}</h5>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <p>Loading product...</p>
                                                    )}
                                                </Col>
                                            )}
                                        </div>
                                    </div>
                                    {lowestScoreBlock && (
                                        <div className="mt-2">
                                            <div className="progress-container-result">
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
                                    )}

                                </div>


                                <div className="col-6">
                                    <div className="position-relative">
                                        <img src={`${process.env.PUBLIC_URL}/img/images/product_thumb.jpg`} alt="img"
                                             className="w-100"/>
                                        {/*<div*/}
                                        {/*    className="position-absolute bottom-0 start-50 translate-middle-x text-center mb-2 bg-white dark p-2 rounded">*/}
                                        {/*    1203 пользователей*/}
                                        {/*</div>*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="fact-area fact-bg">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-8 col-lg-10">
                            <div className="section-title white-title text-center mb-55">
                                <h2>Awesome supplement for your <br/> body we have <span>15 years of experience</span>
                                </h2>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint quasi ut minus labore
                                    voluptate natus fuga voluptatum, id architecto velit eum magni nostrum sit mollitia,
                                    autem dignissimos, optio officiis? Nesciunt. consectetur adipisicing elit. Sint
                                    quasi ut minus labore voluptate natus fuga</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-sm-6">
                            <div className="single-fact text-center mb-50">
                                <div className="fact-icon mb-25">
                                    <img src={`${process.env.PUBLIC_URL}/img/icon/fact_icon01.png`} alt="img"/>
                                </div>
                                <div className="fact-content">
                                    <h5><span className="count">3,560</span> km</h5>
                                    <p>Package Delivered</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="single-fact text-center mb-50">
                                <div className="fact-icon mb-25">
                                    <img src={`${process.env.PUBLIC_URL}/img/icon/fact_icon02.png`} alt="img"/>
                                </div>
                                <div className="fact-content">
                                    <h5><span className="count">195</span></h5>
                                    <p>Countries Covered</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="single-fact text-center mb-50">
                                <div className="fact-icon mb-25">
                                    <img src={`${process.env.PUBLIC_URL}/img/icon/fact_icon03.png`} alt="img"/>
                                </div>
                                <div className="fact-content">
                                    <h5><span className="count">455</span> k</h5>
                                    <p>Happy Customer</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="single-fact text-center mb-50">
                                <div className="fact-icon mb-25">
                                    <img src={`${process.env.PUBLIC_URL}/img/icon/fact_icon04.png`} alt="img"/>
                                </div>
                                <div className="fact-content">
                                    <h5><span className="count">99</span> Yr</h5>
                                    <p>Year Experience</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="faq-area faq-bg pt-110 pb-120">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-7 col-lg-8 col-md-10">
                            <div className="section-title text-center mb-55">
                                <h2>Suppke Ingredients</h2>
                                <div className="bar"></div>
                                <p>There are many variations of passages of Lorem Ipsum that available, but the majority
                                    have fered
                                    alteration in some form, by injected humour.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="faq-img">
                                <img src={`${process.env.PUBLIC_URL}/img/images/faq_img.jpg`} alt="img"/>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="faq-wrapper-padding">
                                <div className="faq-wrapper">
                                    <Accordion>
                                        {qas.map((qa, index) => (
                                            <Accordion.Item eventKey={index.toString()} key={qa.id} className="mb-2">
                                                <Accordion.Header className="card-qa">{qa.question}</Accordion.Header>
                                                <Accordion.Body>{qa.answer}</Accordion.Body>
                                            </Accordion.Item>
                                        ))}
                                    </Accordion>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section id="features" className="features-area features-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-3 col-lg-4 col-md-6">
                            <div className="single-features text-center mb-30">
                                <div className="features-icon mb-20">
                                    <img src={`${process.env.PUBLIC_URL}/img/icon/features_icon01.png`} alt="img"/>
                                </div>
                                <div className="features-content">
                                    <h5>Increased Energy</h5>
                                    <p>Lorem ipsufm dolor site amet mortl regione,dolor sit amet mollis mortl ipsufm
                                        site amet.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6">
                            <div className="single-features text-center mb-30">
                                <div className="features-icon mb-20">
                                    <img src={`${process.env.PUBLIC_URL}/img/icon/features_icon02.png`} alt="img"/>
                                </div>
                                <div className="features-content">
                                    <h5>Calorie Build Up</h5>
                                    <p>Lorem ipsufm dolor site amet mortl regione,dolor sit amet mollis mortl ipsufm
                                        site amet.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6">
                            <div className="single-features text-center mb-30">
                                <div className="features-icon mb-20">
                                    <img src={`${process.env.PUBLIC_URL}/img/icon/features_icon03.png`} alt="img"/>
                                </div>
                                <div className="features-content">
                                    <h5>Energy Grow Up</h5>
                                    <p>Lorem ipsufm dolor site amet mortl regione,dolor sit amet mollis mortl ipsufm
                                        site amet.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6">
                            <div className="single-features text-center mb-30">
                                <div className="features-icon mb-20">
                                    <img src={`${process.env.PUBLIC_URL}/img/icon/features_icon04.png`} alt="img"/>
                                </div>
                                <div className="features-content">
                                    <h5>Regular Routine</h5>
                                    <p>Lorem ipsufm dolor site amet mortl regione,dolor sit amet mollis mortl ipsufm
                                        site amet.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section id="blog" className="blog-area gray-bg pt-110 pb-90">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-7 col-lg-8 col-md-10">
                            <div className="section-title text-center mb-55">
                                <h2>Blog &amp; Tips Suppke</h2>
                                <div className="bar"></div>
                                <p>There are many variations of passages of Lorem Ipsum that available, but the majority
                                    have fered
                                    alteration in some form, by injected humour.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">

                        {articles.map((articles, index) => (


                            <div className="col-lg-4 col-md-6">
                                <div className="single-blog-post mb-30">
                                    <div className="b-post-thumb">
                                        <a href="blog-details.html">
                                            <div class="article-img-container">
                                                <img src={articles.image}
                                                     alt="img" class="article-img"/>
                                            </div>
                                            {/*<img src={articles.image} alt="img" className="article-img"/>*/}
                                        </a>


                                    </div>
                                    <div className="blog-content">
                                        <span>{articles.created_at}</span>
                                        <h3><a href="blog-details.html">{articles.title}</a></h3>
                                        <p>{articles.short_text}</p>
                                        <a href="blog-details.html">Read More</a>
                                    </div>
                                </div>
                            </div>
                            ))}


                    </div>
                </div>
            </section>

            <footer id="contact">
                <div className="footer-wrap pt-190 pb-40" data-background="img/bg/footer_bg.jpg">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-3 col-lg-4 col-md-6">
                                <div className="footer-widget mb-50">
                                    <div className="footer-logo mb-35">
                                        <a href="index.html"></a>
                                    </div>
                                    <div className="footer-text">
                                        <p>Orem Ipsum is simply dumm text the printing and types indstr sum has been the
                                            industry
                                        </p>
                                    </div>
                                    <div className="footer-social">
                                        <ul>
                                            <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                            <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                            <li><a href="#"><i className="fab fa-pinterest-p"></i></a></li>
                                            <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6">
                                <div className="footer-widget mb-50">
                                    <div className="fw-title mb-30">
                                        <h5>recent posts</h5>
                                    </div>
                                    <div className="f-rc-post">
                                        <ul>
                                            <li>
                                                <div className="f-rc-thumb">
                                                    <a href="#"></a>
                                                </div>
                                                <div className="f-rc-content">
                                                    <span>19 Jun, 2019</span>
                                                    <h5><a href="#">which the syste built and actually</a></h5>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="f-rc-thumb">
                                                    <a href="#"></a>
                                                </div>
                                                <div className="f-rc-content">
                                                    <span>19 Jun, 2019</span>
                                                    <h5><a href="#">which the syste built and actually</a></h5>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6">
                                <div className="footer-widget mb-50">
                                    <div className="fw-title mb-30">
                                        <h5>useful links</h5>
                                    </div>
                                    <div className="fw-link">
                                        <ul>
                                            <li><a href="#"><i className="fas fa-caret-right"></i> About us</a></li>
                                            <li><a href="#"><i className="fas fa-caret-right"></i> Delivery Information</a>
                                            </li>
                                            <li><a href="#"><i
                                                className="fas fa-caret-right"></i> Terms &amp; Conditions</a></li>
                                            <li><a href="#"><i className="fas fa-caret-right"></i> Privacy Policy</a>
                                            </li>
                                            <li><a href="#"><i className="fas fa-caret-right"></i> Refund Policy</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6">
                                <div className="footer-widget mb-50">
                                    <div className="fw-title mb-30">
                                        <h5>Send Your Massage</h5>
                                    </div>
                                    <div className="footer-form">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="copyright-wrap">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 col-md-7">
                                <div className="copyright-text">
                                    <p>Copyright© <span>Suppke </span> | All Rights Reserved</p>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-5">
                                <div className="f-payment-method text-center text-md-right">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

        </div>

);
};

export default Component4;
