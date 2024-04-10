import { useContext, useEffect } from "react";
import { StarBackgroundReducerContext } from "~/reducers/starbackground";

export default function Projects$Resource() {
  const starBackgroundSetter = useContext(StarBackgroundReducerContext);

  useEffect(
    () => {
      starBackgroundSetter?.set({ x: -15, y: 0 })
    },
    [starBackgroundSetter]
  );
  
  return <></>;
}
