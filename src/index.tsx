import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ServerRequestPage from './server_request/ServerRequestPage';
import ErrorPage from './ErrorPage';
import GamePage, {
  loader as gameLoader,
} from './game/GamePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ServerRequestPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:serverAddress",
    element: <GamePage />,
    errorElement: <ErrorPage />,
    loader: gameLoader,
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
