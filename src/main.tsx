import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import RootLocaleSetterMiddleware from './routing/middleware/index/RootLocaleSetterMiddleware.tsx';
import RootErrorBoundry from './components/RootErrorBoundry.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './style/index.scss'
import "./translations";
import RouterErrorMiddleware from './routing/middleware/RouterErrorMiddleware.tsx';
import Reducers from './components/Reducers/index.tsx';
import DataFetchMiddleware from './routing/middleware/index/DataFetchMiddleware.tsx';
import RouteLocalePathPickerMiddleware from './routing/middleware/RouteLocalePathPickerMiddleware.tsx'
import Locale$Index from './routing/:locale/index.tsx';
import CatchAllMiddleware from './routing/middleware/CatchAllMiddleware.tsx';
import LoaderFallback from './components/LoaderFallback.tsx';

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
            // start reducer as well
            element: (
              <Reducers>
                <Suspense fallback={ <LoaderFallback /> }>
                  <DataFetchMiddleware>
                    <RootLocaleSetterMiddleware />
                  </DataFetchMiddleware>
                </Suspense>
              </Reducers>
            ),
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
                    path: "e",
                    element: <LoaderFallback />
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
