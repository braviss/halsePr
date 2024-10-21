import React from 'react';

const Component1 = ({onNext}) => {
    return (
        <section id="home" className="slider-area slider-bg d-flex align-items-center">
            <div className="slider-overflow">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="slider-content">
                            <h2 className="wow fadeInUp super-text"
                                data-wow-delay="0.2s">Simple <span>survey</span> for choosing vitamins</h2>
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
        </section>
    );
};

export default Component1;