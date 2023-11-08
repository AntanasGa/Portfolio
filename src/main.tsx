import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import LocalePathPickerMiddleware from './routing/middleware/LocalePathPickerMiddleware';
import RootLocaleSetterMiddleware from './routing/middleware/RootLocaleSetterMiddleware';
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
        element: <RootLocaleSetterMiddleware />,
        children: [
          {
            path: ':locale',
            element: <LocalePathPickerMiddleware />,
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
