import React from 'react'
import ReactDOM from 'react-dom/client'
import RootErrorBoundry from './components/RootErrorBoundry.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './style/index.scss'
import "./translations";
import RouterErrorMiddleware from './routing/middleware/RouterErrorMiddleware.tsx';
import RouteLocalePathPickerMiddleware from './routing/middleware/RouteLocalePathPickerMiddleware.tsx'
import Locale$Index from './routing/:locale/index.tsx';
import CatchAllMiddleware from './routing/middleware/CatchAllMiddleware.tsx';
import LoaderFallback from './components/LoaderFallback.tsx';
import Locale$Projects from './routing/:locale/projects.tsx';
import Index from './routing/index.tsx';


const router = createBrowserRouter([
  {
    element: <RouterErrorMiddleware />,
    children: [
      {
        errorElement: <RootErrorBoundry />,
        element: <RootErrorBoundry />,
        children: [
          {
            path: "/",
            element: <Index />,
            children: [
              {
                path: ':locale',
                element: <RouteLocalePathPickerMiddleware />,
                children: [
                  {
                    index: true,
                    element: <Locale$Index />,
                  },
                  {
                    path: "projects",
                    element: <Locale$Projects />
                  }
                ],
              }
            ],
          },
          {
            path: "*",
            element: <CatchAllMiddleware />
          }
        ],
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!)
  .render(
    <React.StrictMode>
      <RouterProvider
        router={ router }
        fallbackElement={ <LoaderFallback /> }
      />
    </React.StrictMode>,
  )
