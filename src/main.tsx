import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import LocaleWrapper from './components/Translation/LocaleWrapper.tsx';
import RedirectWrapper from './components/Translation/RedirectWrapper.tsx';
import RootErrorBoundry from './components/RootErrorBoundry.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import "./translations";

const router = createBrowserRouter([
  {
    errorElement: <RootErrorBoundry />,
    children: [
      {
        path: "/",
        element: <RedirectWrapper />,
        children: [
          {
            path: ':locale',
            element: <LocaleWrapper />,
            children: [
              {
                index: true,
                element: <App />,
              }
            ],
          }
        ],
      }
    ],
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider
      router={ router }
      fallbackElement={ <div>uhhh</div> }
    />
  </React.StrictMode>,
)
