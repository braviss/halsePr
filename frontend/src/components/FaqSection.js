import React, { useEffect, useState } from 'react';

const FaqSection = () => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const [qas, setQas] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);

    useEffect(() => {
        fetch(`${apiUrl}/content/qa/`)
            .then(response => response.json())
            .then(data => setQas(data))
            .catch(error => console.error('Error fetching data:', error));
    }, [apiUrl]);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="Tj7Ldc Cvtfaz">
            <p className="Mo6IAI">Still have questions?</p>
            <div className="Y3SSyU">
                {qas.map((qa, index) => (
                    <div className="xq4kYz" key={qa.id}>
                        <div className="pG8uRY" onClick={() => handleToggle(index)}>
                            <p className="Jyvvco">{qa.question}</p>
                            <div className="Qle81M">
                                <svg
                                    viewBox="0 0 24 24"
                                    width="1em"
                                    height="1em"
                                    fill="currentColor"
                                    style={{
                                        transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)',
                                        transition: 'transform 0.3s ease',
                                    }}
                                >
                                    <path
                                        d="M12 3C12.5523 3 13 3.44772 13 4V11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H13V20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H11V4C11 3.44772 11.4477 3 12 3Z"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                        {openIndex === index && (
                            <div className="MuiCollapse-root MuiCollapse-vertical">
                                <div className="MuiCollapse-wrapper MuiCollapse-vertical">
                                    <div className="MuiCollapse-wrapperInner MuiCollapse-vertical">
                                        <p className="aTHUaU">{qa.answer}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FaqSection;
