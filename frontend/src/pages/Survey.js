import React, { useState } from 'react';
import Component1 from '../components/Component1';
import Component2 from '../components/Component2';
import Component3 from '../components/Component3';

function Survey() {
    const [step, setStep] = useState(1);

    const handleNext = () => {
        setStep(step + 1);
    };

    return (
        <div>
            {step === 1 && <Component1 onNext={handleNext} />}
            {step === 2 && <Component2 onNext={handleNext} />}
            {step === 3 && <Component3 onNext={handleNext} />}
        </div>
    );
}

export default Survey;
