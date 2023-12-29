import React, { useState } from 'react';
import logo from './../logo.svg';
import './../App.css';
import { isValidIpAddress } from '../utils';

export default function ServerRequestPage() {
  const [response, setResponseRaw] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [gameServerAddress, setGameServerAddress] = useState<string | undefined>(undefined);

  const setResponse = (response: string) => {
    setResponseRaw(response);
    if (isValidIpAddress(response)) {
      setGameServerAddress(response)
    }
  }

  const handleClick = async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    fetch(process.env.REACT_APP_REQUEST_GAME_SERVER_LAMBDA_URL || '', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password })
    })
      .then(res => res.text())
      .then(data => setResponse(data))
      .catch(error => setResponse('Error: ' + error.message))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <label htmlFor="password">Password:</label>
          <input type="text" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button onClick={handleClick} disabled={isLoading}>
          Submit
        </button>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
            gameServerAddress ? (
              <a href={`/${gameServerAddress}`}>Click here to redirect to game room</a>
            ) : (
              <p>
                {response || '<server address>'}
              </p>)
        )}
      </header>
    </div>
  );
}
