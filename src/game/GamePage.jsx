import React from 'react';
import { isValidIpAddress } from '../utils';
import HogwartsBattle from './HogwartsBattle';
import { useLoaderData } from 'react-router-dom';

export async function loader({params}) {
  const serverAddress = params.serverAddress;
  if (!serverAddress || !isValidIpAddress(serverAddress)) {
    throw new Response("Not Found", { status: 404 });
  }
  return { serverAddress: serverAddress };
}

export default function GamePage() {
  const { serverAddress } = useLoaderData();

  return <HogwartsBattle playerID="Ramon" serverAddress={serverAddress} />;
}
