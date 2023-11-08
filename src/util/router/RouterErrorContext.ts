import { createContext, useState } from "react";
import RouterError from "./RouterError";

const RouterErrorContext = createContext<ReturnType<typeof useState<RouterError | undefined>> | undefined>(undefined);

export default RouterErrorContext;
