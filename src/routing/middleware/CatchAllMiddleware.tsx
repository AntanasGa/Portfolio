import { useContext, useEffect } from "react";
import RouterErrorContext from "~/util/router/RouterErrorContext";
import RouterError from "~/util/router/RouterError";


function CatchAllMiddleware() {
  const [ _, setError ] = useContext(RouterErrorContext) ?? [undefined, undefined];

  useEffect(() => {
    setError?.(new RouterError("Route not found", 404))
  }, [setError]);

  return null;
}

export default CatchAllMiddleware;
