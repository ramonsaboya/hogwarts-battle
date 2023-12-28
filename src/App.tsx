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
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <label htmlFor="password">Password:</label>
          <input type="text" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button onClick={handleClick}>
          Submit
        </button>
        <p>
          {response || '<server address>'}
        </p>
      </header>
    </div>
  );
}

export default App;
