import React, {useEffect, useState} from 'react';
import {Accordion} from 'react-bootstrap';


const FaqSection = () => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const [qas, setQas] = useState([]);

    useEffect(() => {
        fetch(`${apiUrl}/content/qa/`)
            .then(response => response.json())
            .then(data => setQas(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    return (
        <section className="faq-area faq-bg mb-4">

            <div className="row">
                <div className="col-lg-12">
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
        </section>
    );
};

export default FaqSection;
