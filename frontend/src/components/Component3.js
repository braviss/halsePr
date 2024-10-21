import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../Survey.css';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import QuestionBlock from './QuestionBlock';
import ProgressBar from "./ProgressBar";
import {useNavigate} from 'react-router-dom';


const Component3 = ({onNext}) => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    const [blocks, setBlocks] = useState([]);
    const [responses, setResponses] = useState({});
    const [currentBlock, setCurrentBlock] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();
    const [startTime, setStartTime] = useState(null);


    useEffect(() => {

        setStartTime(new Date());

        axios.get(`${apiUrl}/api/blocks/`)
            .then(res => {
                console.log(res.data);
                setBlocks(res.data);
                console.log(res.data);
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
                initialResponses[question.id] = {choice: null, input: ''};
            });
        });
        setResponses(initialResponses);
    };

    const handleChange = (questionId, choiceId, inputValue) => {
        const updatedResponses = {
            ...responses,
            [questionId]: {choice: choiceId, input: inputValue},
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

    const saveSurveyResults = async (results) => {
        try {
            await axios.post(`${apiUrl}/api/survey-results/`, results);
            console.log(results);
        } catch (err) {
            console.error("Error saving survey results:", err);
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
            return {block: block.name, score: blockScore, description: block.description, id: block.id};
        });

        const totalScore = blockScores.reduce((sum, block) => sum + block.score, 0);
        const lowestScoreBlock = blockScores.reduce((min, block) => block.score < min.score ? block : min, blockScores[0]);

        // Получаем данные пользователя или временного пользователя из localStorage
        const guestName = localStorage.getItem('guestName');
        const guestEmail = localStorage.getItem('guestEmail');

        console.log(guestName);
        console.log(guestEmail);

        // Собираем данные для отправки на сервер
        const surveyResult = {
            user: null,
            guest_name: guestName ? guestName : null,
            guest_email: guestEmail ? guestEmail : null,
            start_time: startTime,
            end_time: new Date(),
            total_score: totalScore,
            completed: true,
        };

        saveSurveyResults(surveyResult).then(() => {
            localStorage.setItem('lowestScoreBlock', JSON.stringify(lowestScoreBlock));
            localStorage.setItem('blockScores', JSON.stringify(blockScores));
            localStorage.setItem('totalScore', totalScore);

            navigate('/result');
        });
    };

    const updateProgress = (blocks, currentBlock, currentQuestion) => {
        const totalQuestions = blocks.reduce((acc, block) => acc + block.questions.length, 0);
        const answeredQuestions = blocks.slice(0, currentBlock).reduce((acc, block) => acc + block.questions.length, 0) + currentQuestion;
        const percentProgress = (answeredQuestions / totalQuestions) * 100;
        setProgress(percentProgress);
    };

    return (
        <div>
            <ProgressBar progress={progress}/>
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
