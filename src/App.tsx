import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [response, setResponse] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = async () => {
    fetch(process.env.REACT_APP_REQUEST_GAME_SERVER_LAMBDA_URL || '', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password })
    })
      .then(res => res.text())
      .then(data => setResponse(data))
      .catch(error => setResponse('Error: ' + error.message));
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleClick}>
          <img src={logo} className="App-logo" alt="logo" />
        </button>
        <p>
          {response || 'XXXX'}
        </p>
        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
      </header>
    </div>
  );
}

export default App;
