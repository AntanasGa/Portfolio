import random from "../number/random";

interface ICordinates {
  x: number;
  y: number;
}

interface IColor {
  r: number;
  g: number;
  b: number;
}

interface IOpacity {
  opacity: number;
}

interface IMeteorDimensions extends ICordinates {
  r: number;
}

interface IMeteorElementsChildInit {
  coords?: IMeteorDimensions;
  color?: IColor & IOpacity;
  mainStep?: ICordinates;
  maxSteps?: number;
}

const screenPadding = 0.08;

export default class MeteorElement {
  private x: number;
  private y: number;

  private cordStepX: number;
  private cordStepY: number;
  
  private sizeDegradeStep: number;
  private sizeDegradeIndex = 0;
  private size: number;

  private opacityDegradeStep: number;
  private opacityDegradeIndex = 0;
  private opacity: number;

  private color: IColor;

  private stepsLeft: number | undefined;

  private canSpawnChildren: boolean;
  private children: MeteorElement[] = [];

  get end() {
    return this.itemRenderEnd && this.children.length === 0;
  }

  get itemRenderEnd() {
    return this.size < 1 || this.opacity <= 0 || this.stepsLeft === 0;
  }

  constructor(childProps?: IMeteorElementsChildInit) {
    this.canSpawnChildren = !childProps;

    this.x = childProps?.coords?.x ?? random(window.innerWidth * screenPadding, window.innerWidth * (1 - screenPadding));
    this.y = childProps?.coords?.y ?? random(window.innerWidth * screenPadding, window.innerWidth * (1 - screenPadding));

    if (childProps?.coords?.r) {
      this.x += (random(-1, 0) ? -1 : 1) * random(0, childProps.coords.r);
      this.y += (random(-1, 0) ? -1 : 1) * random(0, childProps.coords.r);
    }

    const cords = this.assignStep(childProps);

    this.cordStepX = cords.x;
    this.cordStepY = cords.y;

    this.sizeDegradeStep = childProps ? random(30, 35) : random(10, 20);
    this.size = childProps ? 1 : random(2, 4);

    this.opacityDegradeStep = random(3, 10);
    this.opacity = childProps?.color?.opacity ?? random(500, 700) * 0.001;
    this.color =
      childProps?.color
      ?? {
        r: random(170, 255),
        g: random(100, 255),
        b: random(170, 255),
    };

    this.stepsLeft = random(1000, 5000);
  }

  render(ctx: CanvasRenderingContext2D) {
    if (!random(0, 30)) {
      const replacement = this.switchStepDirection(this.cordStepX, this.cordStepY, 15);
      this.cordStepX = replacement.x;
      this.cordStepY = replacement.y;
    }
    
    if (this.opacityDegradeIndex === this.opacityDegradeStep) {
      this.opacity -= 0.005;
      this.opacityDegradeIndex = 0;
    }

    if (this.sizeDegradeIndex === this.sizeDegradeStep) {
      this.size -= 1;
      this.sizeDegradeIndex = 0;
    }

    if (this.canSpawnChildren) {
      this.children = this.children
        .filter((child) => {
          child.render(ctx)
          return !child.end
        });
    }

    if (this.itemRenderEnd) {
      return;
    }

    if (this.canSpawnChildren) {
      this.children.push(
        ...new Array(random(10, 35))
          .fill(
            new MeteorElement({
              color: {
                ...this.color,
                opacity: this.opacity
              },
              coords: {
                x: this.x + this.cordStepX,
                y: this.y + this.cordStepY,
                r: this.size,
              },
              mainStep: {
                x: this.cordStepX,
                y: this.cordStepY,
              }
            })
          )
      );
    }

    ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
    ctx.beginPath();
    if (this.size < 3) {
      ctx.fillRect(this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
    } else {
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    }
    ctx.fill();

    this.opacityDegradeIndex++;
    this.sizeDegradeIndex++;
    this.x += this.cordStepX;
    this.y += this.cordStepY;
  }

  private assignStep(childProps?: IMeteorElementsChildInit): ICordinates {
    if (!childProps?.mainStep) {
      return {
        x: (random(-1, 0) ? -1 : 1) * random(500, 1500) * 0.01,
        y: (random(-1, 0) ? -1 : 1) * random(500, 1500) * 0.01,
      };
    }

    // flip direction

    const trailStep = this.switchStepDirection(childProps.mainStep.x * -1, childProps.mainStep.y * -1);
    trailStep.x = trailStep.x * 0.025;
    trailStep.y = trailStep.y * 0.025;
    return trailStep;  
  }

  private switchStepDirection(x: number, y: number, switchBy: number = 20) {
    const trailStep = {
      x,
      y,
    };
    const priority = (random(0, 1) ? ["x", "y"] : ["y", "x"]) as (keyof ICordinates)[];
    const takeaway = random(1, switchBy) * 0.01;

    const redistribute = trailStep[priority[0]] * takeaway;
    trailStep[priority[0]] -= redistribute;
    trailStep[priority[1]] += redistribute;

    return trailStep;
  }
}
