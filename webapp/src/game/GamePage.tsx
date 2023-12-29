import React from 'react';
import logo from './../logo.svg';
import './../App.css';
import {useLoaderData} from '../useLoaderData';
import {LoaderFunctionArgs, Params} from 'react-router-dom';
import {isValidIpAddress} from '../utils';

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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Game Page (server address: {serverAddress})</p>
      </header>
    </div>
  );
}
