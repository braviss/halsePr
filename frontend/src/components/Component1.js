import React from 'react';

const Component1 = ({onNext}) => {
    return (
        <div className="jOB_uu" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }}>
            <div className="DOIICY" style={{
                opacity: 1,
                transition: 'opacity 800ms cubic-bezier(0.4, 0, 0.2, 1)',
                minHeight: '0px',
                width: '450px',
            }}>

                <div className="nyM5us">
                    <div className="khsDGw">
                        <div className="sSZirv">
                            <div className="sZYjD1"><img
                                src="img/survey_fork_1.jpg"
                                alt="" className="AAXdq0"/>
                                <div className="w331au ua9UDE">
                                    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"
                                         className="hHSsxv">
                                        <path
                                            d="M3.5 12.9751C3.5 8.29444 7.29444 4.5 11.9751 4.5C16.6558 4.5 20.4503 8.29444 20.4503 12.9751C20.4503 17.6558 16.6558 21.4503 11.9751 21.4503C7.29444 21.4503 3.5 17.6558 3.5 12.9751ZM11.9751 2.5C6.18987 2.5 1.5 7.18987 1.5 12.9751C1.5 18.7604 6.18987 23.4503 11.9751 23.4503C17.7604 23.4503 22.4503 18.7604 22.4503 12.9751C22.4503 7.18987 17.7604 2.5 11.9751 2.5ZM12.9751 7.2902C12.9751 6.73792 12.5274 6.2902 11.9751 6.2902C11.4228 6.2902 10.9751 6.73792 10.9751 7.2902V12.9753C10.9751 13.3541 11.1891 13.7003 11.5279 13.8697L15.3179 15.7647C15.8119 16.0117 16.4126 15.8115 16.6596 15.3175C16.9066 14.8235 16.7063 14.2229 16.2124 13.9759L12.9751 12.3572V7.2902Z"></path>
                                    </svg>
                                    <span>5 minutes</span></div>
                            </div>
                            <div className="alpdeu">
                                <div className="zybzLX"><p className="LVhJVF">Calculate the body's needs</p>
                                    <p className="o_OtE9">Take a detailed survey and receive a course of vitamins
                                        selected based on your condition</p></div>
                                <button type="button" className="FGBa_b Hxy9LG kvvYOr lkanem" onClick={onNext}><span>Let's go</span>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Component1;