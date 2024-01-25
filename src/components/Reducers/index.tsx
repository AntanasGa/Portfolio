import { ReactNode } from "react";
import ManifestReducer from "./ManifestReducer";


export default function Reducers({ children }: { children: ReactNode }) {
  return (
    <ManifestReducer>
      { children }
    </ManifestReducer>
  );
}
