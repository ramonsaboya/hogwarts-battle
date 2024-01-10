import React, {useEffect, useState} from 'react';
import './../App.css';
import {LoaderFunctionArgs, Params} from 'react-router-dom';
import {isValidIpAddress} from '../utils';
import Game from './Game';
import {getSocket, startSocket} from '../socket/socket';
import {PlayerViewContextProvider, useSetPlayerView} from './PlayerViewContext';
import {Hero, SerializedPlayerView} from '@hogwarts-battle/common';

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
  startSocket(serverAddress);
  return {serverAddress: params.serverAddress};
}

function GameLobbyPage() {
  const setPlayerView = useSetPlayerView();
  const socket = getSocket();

  useEffect(() => {
    socket.connect();

    function onConnect() {
      console.log('socket connected');
    }
    function onDisconnect() {
      console.log('socket disconnected');
    }
    function onSyncEvent(playerView: SerializedPlayerView) {
      console.log('sync', playerView);
      setPlayerView(playerView);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('sync', onSyncEvent);

    return () => {
      socket.off('sync', onSyncEvent);
      socket.off('disconnect', onDisconnect);
      socket.off('connect', onConnect);

      socket.disconnect();
    };
  }, []);

  const [playerName, setPlayerName] = useState('');
  const [hero, setHero] = useState<Hero>(Hero.HARRY);
  const [apiResponse, setApiResponse] = useState('');

  // useEffect(() => {
  //   socket.emit(
  //     'join',
  //     'Ramon',
  //     Hero.HARRY,
  //     (playerView: SerializedPlayerView | null) => {
  //       if (!playerView) {
  //         return;
  //       }

  //       console.log('join callback', playerView);
  //       setPlayerView(playerView);
  //       socket.emit('startGame', {}, (playerView: SerializedPlayerView) => {
  //         if (playerView) {
  //           console.log('startGame callback', playerView);
  //           setPlayerView(playerView);
  //         }
  //       });
  //       setApiResponse('Success');
  //     }
  //   );
  // }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    socket.emit(
      'join',
      playerName,
      hero,
      (playerView: SerializedPlayerView | null) => {
        if (playerView) {
          console.log('join callback', playerView);
          setPlayerView(playerView);
          setApiResponse('Success');
        } else {
          setApiResponse('Error');
        }
      }
    );
  };

  return (
    <div>
      {apiResponse.startsWith('Success') ? (
        <Game />
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={playerName}
              onChange={event => setPlayerName(event.target.value)}
              placeholder="Enter your name"
            />
            <select
              value={hero}
              onChange={event => setHero(event.target.value as Hero)}
            >
              <option value="">Select a hero</option>
              <option value="Harry">Harry</option>
              <option value="Hermione">Hermione</option>
              <option value="Ron">Ron</option>
              <option value="Neville">Neville</option>
            </select>
            <button type="submit">Submit</button>
          </form>
          {apiResponse}
        </>
      )}
    </div>
  );
}

export default function GameLobbyPageWithGameStateContext() {
  return (
    <PlayerViewContextProvider>
      <GameLobbyPage />
    </PlayerViewContextProvider>
  );
}
