import { useMemo } from "react";
import { useRouteError } from "react-router-dom";
import RouterError from "../util/router/RouterError";
import { useTranslation } from "react-i18next";


function RootErrorBoundry() {
  const error = useRouteError();
  const { t } = useTranslation("pages", { keyPrefix: "error" });

  const errorInstance = useMemo(() => error instanceof RouterError ? error : undefined, [error]);

  const message = useMemo(() => {
    const translation = t((errorInstance?.status ?? "") + "");
    return translation === "error." ? "" : translation;
  }, [t, errorInstance]);
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
