import { useState } from "react";
import RouterError from "../../util/router/RouterError";
import RouterErrorContext from "../../util/router/RouterErrorContext";
import { Outlet } from "react-router-dom";

export default function RouterErrorMiddleware() {
  const error = useState<RouterError | undefined>(undefined);
  
  return (
    <RouterErrorContext.Provider value={ error }><Outlet /></RouterErrorContext.Provider>
  );
}
