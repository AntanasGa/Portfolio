import { useContext, useEffect, useMemo, useRef } from "react";
import { StarBackgroundStateContext } from "~/reducers/starbackground";
import StarElement from "~/util/dom/StarElement";

function StarGazer() {
  const starCount = 500;
  const scale = 30;

  const starBackgroundState = useContext(StarBackgroundStateContext);

  const canvasRef = useRef<HTMLCanvasElement>(null);

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

      let intervalReset: NodeJS.Timeout | undefined = undefined;
      let activeCount = 1;

      const render = () => {
        if (activeCount < starCount) {
          activeCount += 1;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < activeCount; i++) {
          starPositions[i].step(ctx);
        }

        ctx.closePath();

        if (activeCount >= starCount && starPositions.every((x) => x.end)) {
          clearInterval(intervalReset);
        }
      };

      intervalReset = setInterval(
        () => requestAnimationFrame(render),
        // fps locking
        50
      );

      return () => {
        clearInterval(intervalReset);
      };
    },
    [starPositions]
  );

  return (
    <canvas className="star-gazer" ref={canvasRef} style={starBackgroundState} width={3000} height={3000} />
  );
}

export default StarGazer;
