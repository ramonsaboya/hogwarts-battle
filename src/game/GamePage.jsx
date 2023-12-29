import React, { useState } from 'react';
import { isValidIpAddress } from '../utils';
import { useLoaderData } from 'react-router-dom';

export async function loader({params}) {
  const serverAddress = params.serverAddress;
  if (!serverAddress || !isValidIpAddress(serverAddress)) {
    throw new Response("Not Found", { status: 404 });
  }
  return { serverAddress };
}

export default function GamePage() {
  const { serverAddress } = useLoaderData();
  const [playerName, setPlayerName] = useState('');

  const handlePlayerNameChange = (event) => {
    setPlayerName(event.target.value);
  };

  return (
    <div>
      <input type="text" value={playerName} onChange={handlePlayerNameChange} />
      <button>Call API</button>
    </div>
  );
}
