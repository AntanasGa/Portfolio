import { useContext, useEffect, useMemo, useRef } from "react";
import { StarBackgroundStateContext } from "~/reducers/starbackground";
import StarElement from "~/util/dom/StarElement";

function StarGazer() {
  const starCount = 1000;
  const scale = 30;

  const starBackgroundState = useContext(StarBackgroundStateContext);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeCount = useRef(1);

  const starPositions = useMemo(
    () =>
      new Array(starCount)
        .fill(undefined)
        .map(() => new StarElement(scale))
        .sort((a, b) => a.distance - b.distance)
    ,
    []
  );

  useEffect(
    () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        return;
      }

      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) {
        return;
      }

      let reset: number;
      let date = Date.now();

      const render = () => {
        if (Date.now() - date > 25 && activeCount.current < starCount) {

          date = Date.now();
          activeCount.current += 1;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < activeCount.current; i++) {
          starPositions[i].step(ctx);
        }

        if (activeCount.current < starCount || !starPositions.every((x) => x.end)) {
          reset = requestAnimationFrame(render);
          return;
        }
      };

      reset = requestAnimationFrame(render);

      return () => {
        cancelAnimationFrame(reset);
      };
    },
    [starPositions]
  );

  return (
    <canvas className="star-gazer" ref={canvasRef} style={starBackgroundState} width={scale * 100} height={scale * 100} />
  );
}

export default StarGazer;
