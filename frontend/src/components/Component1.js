import React from 'react';
import {Card, Row} from 'react-bootstrap';

const Component1 = ({onNext}) => {
    return (
        <div>
            <section id="home" className="slider-area slider-bg d-flex align-items-center">
                <div className="container">
                    <div className="slider-overflow">
                        <div className="row">
                            <div className="col-lg-6 order-0 order-lg-2">
                                <div className="slider-img text-center text-lg-right text-xl-center position-relative">

                                    <img src={`${process.env.PUBLIC_URL}/img/slider/slider_img.png`} alt="img"
                                         className="wow fadeInRight w-100"/>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="slider-content">
                                    <h2 className="wow fadeInUp super-text"
                                        data-wow-delay="0.2s">Super <span>Convenient</span> Quality
                                        Protein</h2>
                                    <p className="wow fadeInUp super-text2" data-wow-delay="0.4s">Lorem
                                        ipsum dolor sit amet, consectetur seddo eiumod tempor incididunt labore
                                        adipiscing seddo eiumod</p>
                                    <div className="slider-btn">
                                        <button className="btn btn-primary custom-btn-primary" onClick={onNext}>Start
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Component1;