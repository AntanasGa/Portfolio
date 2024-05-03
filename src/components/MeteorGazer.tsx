import { useEffect, useRef, useState } from "react";
import MeteorElement from "~/util/dom/MeteorElement";
import random from "~/util/number/random";

function MeteorGazer() {
  const cavasEl = useRef<HTMLCanvasElement>(null);
  const meteor = useRef<MeteorElement[]>([]);
  const timeoutIndex = useRef<NodeJS.Timeout | undefined>();
  const intervalIndex = useRef<NodeJS.Timeout | undefined>();
  const limit = useRef(1);

  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(
    () => {
      const resize = () => {
        setSize({ width: window.innerWidth, height: window.innerHeight });
      };

      window.addEventListener("resize", resize);
      return () => {
        window.removeEventListener("resize", resize);
      };
    },
    []
  );

  useEffect(
    ()=> {
      const canvas = cavasEl.current;
      const ctx = cavasEl.current?.getContext("2d");
      if (!ctx || !canvas) {
        return;
      }

      meteor.current.push(new MeteorElement());

      const render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        meteor.current = meteor.current.filter(x => {
          x.render(ctx);
          return !x.end
        });

        ctx.closePath();

        if (meteor.current.length < limit.current && random(0, 500) > 450) {
          meteor.current.push(new MeteorElement());
          if (random(0, 1) && limit.current < 3) {
            limit.current += 1;
          }
        }
      };

      timeoutIndex.current = setTimeout(
        () => {
          intervalIndex.current = setInterval(
            () => requestAnimationFrame(() => render()),
            // fps locking
            50
          );
        },
        random(5000, 8000)
      );
      return () => {
        if (timeoutIndex.current !== void 0) {
          clearTimeout(timeoutIndex.current);
        }
        if (intervalIndex.current !== void 0) {
          clearTimeout(intervalIndex.current);
        }
      }
    },
    []
  );

  return (
    <div className="meteor-gazer">
      <canvas
        ref={cavasEl}
        { ...size }
      ></canvas>
    </div>
  );
}

export default MeteorGazer;
