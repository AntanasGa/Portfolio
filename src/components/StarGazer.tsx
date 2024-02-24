import { useContext, useEffect, useMemo, useState } from "react";
import { StarBackgroundStateContext } from "~/reducers/starbackground";
import { getStarPosition } from "~/util/dom/StarPosition";

function StarGazer() {
  const starCount = 200;

  const { transform } = useContext(StarBackgroundStateContext);

  const star = useMemo(() => new Array(starCount).fill(undefined).map(() => getStarPosition()), []);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const interval = setTimeout(() => {
      if (currentIndex > starCount) {
        clearTimeout(interval);
        return;
      }
      setCurrentIndex((currentIndex + 1));
    }, 50);

    return () => {
      clearTimeout(interval);
    };
  }, [currentIndex, starCount]);

  return (
    <div className="star-gazer" style={{ transform }} >
      {star.slice(0, currentIndex).map((style, i) => (
        <div key={i} style={{...style, ...((i + 1) < currentIndex ? { transform: style.transform, opacity: 1 } : { transform: "translate(0%, 0%)", opacity: 0 })}}>
        </div>
      ))}
    </div>
  );
}

export default StarGazer;
