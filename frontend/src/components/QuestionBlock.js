import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const QuestionBlock = ({
  question,
  choices,
  responses,
  handleChange,
  handleNextQuestion,
  handlePrevious,
  currentQuestion,
  totalQuestions
}) => {
  const handleChoiceChange = (e) => {
    handleChange(question.id, parseInt(e.target.value), '');
  };

  const handleInputChange = (e) => {
    handleChange(question.id, null, e.target.value);
  };

  return (
    <Row className="d-flex justify-content-center align-items-center vh-100">
      <Col md="auto">
        <div className="container mt-5 text-center">
          <h3 style={{ fontSize: '24px' }}>{question.text}</h3>
          <p>Description text center</p>
          <Form>
            <div className="btn-group-vertical w-100" role="group" aria-label="Vertical radio toggle button group">
              {choices.map(choice => (
                <div key={choice.id} className="w-100">
                  {choice.choice_type === 'select' && (
                    <>
                      <input
                        type="radio"
                        className="btn-check"
                        name={`question-${question.id}`}
                        id={`choice-${choice.id}`}
                        value={choice.id}
                        checked={responses[question.id]?.choice === choice.id}
                        onChange={handleChoiceChange}
                        autoComplete="off"
                      />
                      <label
                        className="btn btn-choice w-100 mb-2 rounded"
                        htmlFor={`choice-${choice.id}`}
                      >
                        {choice.text}
                      </label>
                    </>
                  )}
                  {choice.choice_type === 'input' && (
                    <Form.Group controlId={`question-${question.id}-${choice.id}`}>
                      <Form.Label>{choice.text}</Form.Label>
                      <Form.Control
                        type="text"
                        className="survey-input-text"
                        value={responses[question.id]?.input || ''}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  )}
                </div>
              ))}
            </div>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mt-3">
              <Button onClick={handlePrevious} className="custom-btn-primary" disabled={currentQuestion === 0}>Previous</Button>
              <Button onClick={handleNextQuestion} className="custom-btn-primary">
                {currentQuestion === totalQuestions - 1 ? 'Next Block' : 'Next Question'}
              </Button>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default QuestionBlock;


// import React from 'react';
// import {Form, Button, Row, Col} from 'react-bootstrap';
//
// const QuestionBlock = ({
//                            question,
//                            choices,
//                            responses,
//                            handleChange,
//                            handleNextQuestion,
//                            handlePrevious,
//                            currentQuestion,
//                            totalQuestions
//                        }) => {
//     const handleChoiceChange = (e) => {
//         handleChange(question.id, parseInt(e.target.value), '');
//     };
//
//     const handleInputChange = (e) => {
//         handleChange(question.id, null, e.target.value);
//     };
//
//     return (
//         <Row className="d-flex justify-content-center align-items-center vh-100">
//
//             <Col md="auto">
//
//                 <h3>{question.text}</h3>
//
//                 <Form>
//                     {choices.map(choice => (
//                         <div key={choice.id}>
//                             {choice.choice_type === 'select' && (
//                                 <Form.Check
//                                     type="radio"
//                                     label={choice.text}
//                                     name={`question-${question.id}`}
//                                     value={choice.id}
//                                     checked={responses[question.id]?.choice === choice.id}
//                                     onChange={handleChoiceChange}
//                                 />
//                                 )}
//                             {choice.choice_type === 'input' && (
//                                 <Form.Group controlId={`question-${question.id}-${choice.id}`}>
//                                     <Form.Label>{choice.text}</Form.Label>
//                                     <Form.Control
//                                         type="text"
//                                         className="survey-input-text"
//                                         value={responses[question.id]?.input || ''}
//                                         onChange={handleInputChange}
//                                     />
//                                 </Form.Group>
//                             )}
//                         </div>
//                     ))}
//                     <Button onClick={handlePrevious} disabled={currentQuestion === 0}>Previous</Button>
//                     <Button onClick={handleNextQuestion}>
//                         {currentQuestion === totalQuestions - 1 ? 'Next Block' : 'Next Question'}
//                     </Button>
//                 </Form>
//
//
//             </Col>
//         </Row>
// );
// };
//
// export default QuestionBlock;
//
//
//
