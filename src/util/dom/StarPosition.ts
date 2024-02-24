import { CSSProperties } from "react";
import random from "~/util/number/random";

/**
 * Returns a CSS object with a random position for a star
 */
export function getStarPosition() {
  const x = random(0, 99) + (random(0, 999) / 1000);
  
  const y = random(0, 99) + (random(0, 999) / 1000);
  
  const shiftFactor = (random(75, 150));
  
  const shiftCss: CSSProperties = {
    position: "absolute",
    top: `${y}%`,
    left: `${x}%`,
    transform: `translate(${(x - 50) * shiftFactor}%, ${(y - 50) * shiftFactor}%)`,
    transitionDuration: `${random(2000, 5000) / 100}s`,
  };
  
  return shiftCss;
}
