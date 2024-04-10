import { useContext, useEffect } from "react";
import RouterErrorContext from "~/util/router/RouterErrorContext";
import RouterError from "~/util/router/RouterError";
import { ManifestStateContext } from "~/reducers/manifest";
import { Outlet, useParams } from "react-router-dom";


function ProjectLookupMiddleware() {
  const manifestState = useContext(ManifestStateContext);
  const { resource } = useParams();

  const [ _, setError ] = useContext(RouterErrorContext) ?? [undefined, undefined];

  useEffect(() => {
    if (!manifestState.loaded) {
      return;
    }

    if (!manifestState.content.find(x => x.resource === resource)) {
      setError?.(new RouterError("Route not found", 404))
    }
  }, [setError, manifestState, resource]);

  return manifestState.loaded ? <Outlet /> : null;
}

export default ProjectLookupMiddleware;
