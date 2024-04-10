import { useContext, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { ManifestStateContext } from "~/reducers/manifest";
import { StarBackgroundReducerContext } from "~/reducers/starbackground";
import { CONTENT } from "~/util/cdn/constants";
import { usePromiseSuspense } from "~/util/hooks";
import RouterError from "~/util/router/RouterError";

export default function Projects$Resource() {
  const starBackgroundSetter = useContext(StarBackgroundReducerContext);
  const manifestState = useContext(ManifestStateContext);
  const { resource } = useParams();
  
  const content = usePromiseSuspense(
    async () => {
      const res = await fetch(new URL(resource ?? "", CONTENT).toString());
      if (res.status !== 200) {
        throw new RouterError("Route not found", 404);
      }
      return await res.text();
    },
    [resource]
  );

  const project = useMemo(() => manifestState.content.find(x => x.resource === resource), [manifestState, resource]);


  useEffect(
    () => {
      starBackgroundSetter?.set({ x: -15, y: 0 });
    },
    [starBackgroundSetter]
  );
  
  return <>{ content }</>;
}
