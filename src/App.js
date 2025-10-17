import React, { useState } from 'react';
import Sentiment from 'sentiment';
import './App.css';

const sentiment = new Sentiment();

function App() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);

  const handleAnalyze = () => {
    if (text.trim() === '') return;

    const analysis = sentiment.analyze(text);
    let sentimentDesc = 'Neutral vibes.';
    if (analysis.score > 0) sentimentDesc = 'Positive vibes 😊';
    else if (analysis.score < 0) sentimentDesc = 'Negative vibes 😔';

    const resultData = {
      text: text,
      score: analysis.score,
      comparative: analysis.comparative,
      description: sentimentDesc,
    };

    setResult(resultData);

    // Save only once — when user clicks Analyze button
    fetch('http://localhost:5000/results', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resultData),
    }).catch((err) => console.error('Failed to save result:', err));
  };

  return (
    <div className="App">
      <h1>Sentiment Analysis</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your text here..."
      />
      <button onClick={handleAnalyze}>Analyze</button>

      {result && (
        <div className="result">
          <p>Score: {result.score}</p>
          <p>Comparative: {result.comparative.toFixed(3)}</p>
          <p>{result.description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
