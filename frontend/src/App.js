import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap';
import Component1 from './components/Component1';
import Component2 from './components/Component2';
import Component3 from './components/Component3';
import Component4 from './components/Component4';

function App() {
    const [step, setStep] = useState(1);

    const handleNext = () => {
        setStep(step + 1);
    };

    return (
        <div>
            {step === 1 && <Component1 onNext={handleNext}/>}
            {step === 2 && <Component2 onNext={handleNext}/>}
            {step === 3 && <Component3 onNext={handleNext}/>}
            {step === 4 && <Component4/>}
        </div>
    );
}

export default App;


// import React, {useState} from 'react';
// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import {Container, Row, Col} from 'react-bootstrap';
//
// import Component1 from './components/Component1';
// import Component2 from './components/Component2';
// import Component3 from './components/Component3';
// import Component4 from './components/Component4';
//
// function App() {
//     const [step, setStep] = useState(1);
//
//     const handleNext = () => {
//         setStep(step + 1);
//     };
//
//     return (
//         <Container fluid="sm" className="">
//             <Row>
//                 <Col className="md-12">
//                     {step === 1 && <Component1 onNext={handleNext}/>}
//                     {step === 2 && <Component2 onNext={handleNext}/>}
//                     {step === 3 && <Component3 onNext={handleNext}/>}
//                     {step === 4 && <Component4/>}
//                 </Col>
//             </Row>
//         </Container>
//     );
// }
//
// export default App;