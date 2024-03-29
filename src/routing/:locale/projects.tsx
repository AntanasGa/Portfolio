import { useContext, useEffect } from "react";
import LoaderFallback from "~/components/LoaderFallback";
import { StarBackgroundReducerContext } from "~/reducers/starbackground";

function Locale$Projects() {
  const starBackgroundSetter = useContext(StarBackgroundReducerContext);

  useEffect(() => {
    starBackgroundSetter?.set({ x: 15, y: -15 })
  }, [starBackgroundSetter]);

  return (
    <LoaderFallback />
  );
}

export default Locale$Projects;
