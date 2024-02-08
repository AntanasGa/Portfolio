import { useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";
import RouterErrorContext from "../util/router/RouterErrorContext";
import { Outlet, useRouteError } from "react-router-dom";


function RootErrorBoundry() {
  const [ routeError ] = useContext(RouterErrorContext) ?? [];
  const error = useRouteError();
  const { t } = useTranslation("pages", { keyPrefix: "error" });

  const message = useMemo(() => {
    if (routeError) {
      const translation = t((routeError?.status ?? "") + "");
      return translation === "error." ? "" : translation;
    }
    
    if (!error) {
      return undefined;
    }

    return error instanceof Error ? error.message : error + "";
  }, [t, routeError, error]);
  
  if (message === undefined) {
    return <Outlet />;
  }

  return (
    <div>
      <h1>{ t("defaultMessage") }</h1>
      {message.trim() &&
        <p>{ message }</p>
      }
    </div>
  );
}

export default RootErrorBoundry;
