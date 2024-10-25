import React, { useEffect, useState, useRef } from 'react';
import { Container, Button, ProgressBar } from 'react-bootstrap';
import { useAuth } from '../AuthContext';

const TriviaRoom = () => {
    const ws = useRef(null);
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState([]);
    const [gameStarted, setGameStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);  // 30 seconds countdown
    const [intervalInstance, setIntervalInstance] = useState(null);
    const [score, setScore] = useState(0);

    const { user } = useAuth();


    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            ws.current = new WebSocket(`ws://localhost:8000/ws/game/?token=${token}`);

            ws.current.onopen = () => {
                console.log("WebSocket connection established.");
            };

            ws.current.onmessage = handleOnMessage;

            ws.current.onclose = () => {
                console.log("WebSocket connection closed.");
                ws.current = null;  // Clear the WebSocket reference
            };

            ws.current.onerror = (error) => {
                console.error("WebSocket error:", error);
            };

            // Cleanup when the component unmounts
            return () => {
                if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                    ws.current.close();
                }
            };
        } else {
            console.error("No token found in localStorage");
        }
    }, []);

    const handleOnMessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.message === 'New Question') {
            setGameStarted(true);
            setQuestion(data.question);
            setOptions(data.options);
            setTimeLeft(30);  // Reset the timer for each new question
            startCountdown();  // Start the countdown
        } else if (data.message === 'Result') {
            setGameStarted(false);
            setScore(data.players_scores[user?.id]);
        } else if (data.message === 'Player Left') {
            alert('Your opponent has left the game.');
            setGameStarted(false);
        }
    };

    const startCountdown = () => {
        const interval = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    onCountdownFinish();  // Call your method when the countdown finishes
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);  // Decrease time every second
        setIntervalInstance(interval);
    };

    // Method to call when countdown finishes
    const onCountdownFinish = () => {
        console.log("Countdown finished. Time's up!");
        // You can send a message to the server here or handle the end of the question round
        handleAnswer("");

    };

    const handleAnswer = (answer) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify({ type: 'answer', answer, 'remaining_time': timeLeft }));
            console.log("Answer sent:", answer);
        } else {
            console.error("WebSocket is not open. Cannot send message.");
        }
        clearInterval(intervalInstance);
    };

    if (!gameStarted) {
        return <Container><p>Waiting for another player to join...</p></Container>;
    }

    return (
        <Container>
            <span>
            <h2>Trivia Game</h2>
            <p>{question}</p>
            <ProgressBar now={timeLeft} max={30} label={`${timeLeft}s`} />
            {options.map((option, index) => (
                <Button key={index} variant="primary" className="m-2" onClick={() => handleAnswer(option)}>
                    {option}
                </Button>
            ))}
            </span>
            <span>
                score: {score}
            </span>
        </Container>
    );
};

export default TriviaRoom;