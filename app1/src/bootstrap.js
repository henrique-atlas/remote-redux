import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { Header } from './header'
import './main.css'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Contact from './contacts';
import ErrorPage from './errorPage';
import { SampleMicro } from './sampleMicroFrontend';
import Home from './home';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Header />
        <Outlet />
        
      </div>
    </Provider>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
      {
        path: "lazy",
        lazy: () => import("./sampleLazyRoute")
      },
      {
        path: "micro/*",
        element: <SampleMicro />,
      },
    ],
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById("root")
);
