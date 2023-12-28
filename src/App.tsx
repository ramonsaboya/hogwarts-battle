import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [response, setResponse] = useState('');

  const handleClick = async () => {
    const res = await fetch(process.env.REACT_APP_REQUEST_GAME_SERVER_LAMBDA_URL || '');
    const data = await res.text();
    setResponse(data);
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
      </header>
    </div>
  );
}

export default App;
