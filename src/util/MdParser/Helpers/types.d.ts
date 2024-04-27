import React, { ReactHTML } from "react";

// with some specific react components this is necessary
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DynamicComponent = keyof ReactHTML | React.FC | React.ForwardRefExoticComponent<any>;
