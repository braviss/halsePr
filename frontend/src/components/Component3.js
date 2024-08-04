import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Survey.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import QuestionBlock from './QuestionBlock';
import ProgressBar from "./ProgressBar";

const Component3 = ({ onNext }) => {
    const [blocks, setBlocks] = useState([]);
    const [responses, setResponses] = useState({});
    const [currentBlock, setCurrentBlock] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:8000/api/blocks/')
            .then(res => {
                setBlocks(res.data);
                initializeResponses(res.data);
                updateProgress(res.data, currentBlock, currentQuestion);
            })
            .catch(err => {
                console.error("Error fetching blocks:", err);
            });
    }, []);

    useEffect(() => {
        if (blocks.length > 0) {
            updateProgress(blocks, currentBlock, currentQuestion);
        }
    }, [currentBlock, currentQuestion, blocks]);

    const initializeResponses = (blocksData) => {
        const initialResponses = {};
        blocksData.forEach(block => {
            block.questions.forEach(question => {
                initialResponses[question.id] = { choice: null, input: '' };
            });
        });
        setResponses(initialResponses);
    };

    const handleChange = (questionId, choiceId, inputValue) => {
        const updatedResponses = {
            ...responses,
            [questionId]: { choice: choiceId, input: inputValue },
        };
        setResponses(updatedResponses);
    };

    const handleNextQuestion = () => {
        const nextQuestionIndex = currentQuestion + 1;
        if (nextQuestionIndex < blocks[currentBlock].questions.length) {
            setCurrentQuestion(nextQuestionIndex);
        } else {
            handleNextBlock();
        }
    };

    const handleNextBlock = () => {
        const nextBlockIndex = currentBlock + 1;
        if (nextBlockIndex < blocks.length) {
            setCurrentBlock(nextBlockIndex);
            setCurrentQuestion(0);
        } else {
            calculateScores();
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        } else if (currentBlock > 0) {
            setCurrentBlock(currentBlock - 1);
            setCurrentQuestion(blocks[currentBlock - 1].questions.length - 1);
        }
    };

    const calculateScores = () => {
        const blockScores = blocks.map(block => {
            let blockScore = 0;
            block.questions.forEach(question => {
                const response = responses[question.id];
                if (response.choice) {
                    const choice = question.choices.find(choice => choice.id === response.choice);
                    blockScore += choice.weight;
                }
                if (response.input) {
                    const choice = question.choices.find(choice => choice.choice_type === 'input');
                    if (choice) {
                        blockScore += choice.weight;
                    }
                }
            });
            return { block: block.name, score: blockScore };
        });

        const totalScore = blockScores.reduce((sum, block) => sum + block.score, 0);
        const lowestScoreBlock = blockScores.reduce((min, block) => block.score < min.score ? block : min, blockScores[0]);
        localStorage.setItem('lowestScoreBlock', JSON.stringify(lowestScoreBlock));
        localStorage.setItem('blockScores', JSON.stringify(blockScores));
        onNext();
    };

    const updateProgress = (blocks, currentBlock, currentQuestion) => {
        const totalQuestions = blocks.reduce((acc, block) => acc + block.questions.length, 0);
        const answeredQuestions = blocks.slice(0, currentBlock).reduce((acc, block) => acc + block.questions.length, 0) + currentQuestion;
        const percentProgress = (answeredQuestions / totalQuestions) * 100;
        setProgress(percentProgress);
    };

    return (
        <div>
            <ProgressBar progress={progress} />
            {blocks.length === 0 ? (
                <p>Loading blocks...</p>
            ) : (
                <TransitionGroup>
                    <CSSTransition
                        key={blocks[currentBlock].questions[currentQuestion].id}
                        timeout={500}
                        classNames="fade"
                        nodeRef={React.createRef()}
                    >
                        <QuestionBlock
                            question={blocks[currentBlock].questions[currentQuestion]}
                            choices={blocks[currentBlock].questions[currentQuestion].choices}
                            responses={responses}
                            handleChange={handleChange}
                            handleNextQuestion={handleNextQuestion}
                            handlePrevious={handlePrevious}
                            currentQuestion={currentQuestion}
                            totalQuestions={blocks[currentBlock].questions.length}
                            onNext={onNext}
                        />
                    </CSSTransition>
                </TransitionGroup>
            )}
        </div>
    );
};

export default Component3;