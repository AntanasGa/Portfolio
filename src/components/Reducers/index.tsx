import { ReactNode } from "react";
import ManifestReducer from "./ManifestReducer";
import StarBackgroundReducer from "./StarBackgroundReducer";


export default function Reducers({ children }: { children: ReactNode }) {
  return (
    <ManifestReducer>
      <StarBackgroundReducer>
      { children }
      </StarBackgroundReducer>
    </ManifestReducer>
  );
}
