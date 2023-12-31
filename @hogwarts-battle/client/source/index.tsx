import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import ServerRequestPage from './server_request/ServerRequestPage';
import ErrorPage from './ErrorPage';
import GamePage, {loader as gameLoader} from './game/GameLobbyPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ServerRequestPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/:serverAddress',
    element: <GamePage />,
    errorElement: <ErrorPage />,
    loader: gameLoader,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
