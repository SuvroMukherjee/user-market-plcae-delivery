import React, { useState, useEffect } from 'react';

const Speech = () => {
    const [transcript, setTranscript] = useState('');
    const [isListening, setIsListening] = useState(false);

    useEffect(() => {
        if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
            alert('Speech recognition is not supported in your browser. Please use a supported browser.');
        }
    }, []);

    const recognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionInstance = new recognition();

    recognitionInstance.onstart = () => {
        setIsListening(true);
    };

    recognitionInstance.onresult = (event) => {
        const last = event.results.length - 1;
        const text = event.results[last][0].transcript;
        setTranscript(text);
    };

    recognitionInstance.onend = () => {
        setIsListening(false);
    };

    const startListening = () => {
        recognitionInstance.start();
    };

    return (
        <div>
            <h1>Speech-to-Text</h1>
            <button onClick={startListening} disabled={isListening}>
                Start Listening
            </button>
            <p>{transcript}</p>
        </div>
    );
};

export default Speech;
