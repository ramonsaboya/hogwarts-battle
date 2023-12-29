import React, {useState} from 'react';
import './../App.css';
import {useLoaderData} from '../useLoaderData';
import {LoaderFunctionArgs, Params} from 'react-router-dom';
import {isValidIpAddress} from '../utils';
import {getErrorMessage} from '../error_handling';

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

export default function GamePage() {
  const {serverAddress} = useLoaderData<GameLoaderData>();

  const [playerName, setPlayerName] = useState('');
  const [apiResponse, setApiResponse] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      console.log(playerName);
      const response = await fetch(`http://${serverAddress}:4000/join`, {
        method: 'POST',
        body: JSON.stringify({playerName}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        setApiResponse('Success');
      } else {
        const body = await response.json();
        setApiResponse(body.error);
      }
    } catch (error) {
      setApiResponse(getErrorMessage(error));
    }
  };

  return (
    <div>
      {apiResponse === 'Success' ? (
        <div>Success</div>
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
