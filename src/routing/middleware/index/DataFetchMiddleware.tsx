import { ReactNode, useContext, useEffect } from "react";
import { IManifestReducer, ManifestReducerContext } from "~/reducers/manifest";
import { HOST } from "~/util/cdn/constants";
import { createPromiseSuspense } from "~/util/hooks";

const manifestFetch = createPromiseSuspense<IManifestReducer>(new Promise((resolve, reject) => {
  const url = new URL("manifest.json", HOST);
  fetch(url.toString())
    .then((res) => {
      if (res.status !== 200) {
        reject(new Response(res.body, { status: res.status }));
      }
      res.json()
        .then((data: IManifestReducer) => {
          resolve(data);
        })
        .catch((err) => reject(err))
    })
    .catch((err) => reject(err));
}));

function DataFetchMiddleware({ children }: { children: ReactNode }) {
  const manifestReducer = useContext(ManifestReducerContext);
  const items = manifestFetch();

  useEffect(() => {
    if (items) {
      console.log(items);
      manifestReducer?.fullSet(items);
    }
  }, [ items, manifestReducer ]);
  
  return children;
}

export default DataFetchMiddleware;
