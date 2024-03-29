import { Suspense } from "react";
import LoaderFallback from "~/components/LoaderFallback";
import Reducers from "~/components/Reducers";
import StarGazer from "~/components/StarGazer";
import DataFetchMiddleware from "./middleware/index/DataFetchMiddleware";
import RootLocaleSetterMiddleware from "./middleware/index/RootLocaleSetterMiddleware";
import NavSelector from "~/components/Navigation/NavSelector";
import { createPortal } from "react-dom";

const bottomPortal = document.getElementById('bottom-bar-portal-root')!;

export default function Index() {
  return (
    <Reducers>
      <StarGazer />
      <Suspense fallback={ <LoaderFallback /> }>
        <DataFetchMiddleware>
          <RootLocaleSetterMiddleware />
        </DataFetchMiddleware>
        { createPortal(<NavSelector />, bottomPortal) }
      </Suspense>
    </Reducers>
  );
}
