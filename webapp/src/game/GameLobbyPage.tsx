import React, {useState} from 'react';
import './../App.css';
import {useLoaderData} from '../useLoaderData';
import {LoaderFunctionArgs, Params} from 'react-router-dom';
import {isValidIpAddress} from '../utils';
import {getErrorMessage} from '../error_handling';
import Game from './Game';
import {GameStateContextProvider} from './GameStateContext';

type GameLoaderData = {
  serverAddress: string | undefined;
};

export async function loader({
  params,
}: LoaderFunctionArgs<Params>): Promise<GameLoaderData> {
  const serverAddress = params.serverAddress;
  if (!serverAddress || !isValidIpAddress(serverAddress)) {
    throw new Response('Not Found', {status: 404});
  }
  return {serverAddress: params.serverAddress};
}

export default function GameLobbyPage() {
  const {serverAddress} = useLoaderData<GameLoaderData>();

  const [playerName, setPlayerName] = useState('');
  const [apiResponse, setApiResponse] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      console.log(playerName);
      const response = await fetch(`http://${serverAddress}:4030/join`, {
        method: 'POST',
        body: JSON.stringify({playerName}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const body = await response.json();
      if (response.ok) {
        setApiResponse(`Success! Player ID: ${body.playerID}`);
      } else {
        setApiResponse(body.error);
      }
    } catch (error) {
      setApiResponse(getErrorMessage(error));
    }
  };

  return (
    <div>
      {apiResponse.startsWith('Success') ? (
        <GameStateContextProvider>
          <Game />
        </GameStateContextProvider>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={playerName}
              onChange={event => setPlayerName(event.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
          {apiResponse}
        </>
      )}
    </div>
  );
}
