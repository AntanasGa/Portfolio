import random from "../number/random";

export default class StarElement {
  private _x: number;
  private _y: number;
  
  private cordStepX: number;
  private cordStepY: number;

  private steps: number;
  private currentStep: number = 0;

  private maxOpacity: number;
  private opacityStep: number;
  private opacity: number;

  private _distance: number;

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get end() {
    return this.currentStep >= this.steps;
  }

  get distance() {
    return this._distance;
  }

  constructor(scale: number) {
    this._x = random(5 * scale, 95 * scale) + (random(0, 999) / 1000);
    this._y = random(5 * scale, 95 * scale) + (random(0, 999) / 1000);
    this._distance = Math.abs((this.y / scale) - 50) + Math.abs((this.x / scale) - 50);

    const distance = random(40, 100);
    this.maxOpacity = distance / 100;
    const unsetStep = (random(50, 500) * this.maxOpacity * this.maxOpacity ) / (100 * scale);
    this.cordStepX = unsetStep;
    this.cordStepY = unsetStep;
    this.setCordStepDirection(scale);
    this.steps = Math.floor(random(500, 800) * (100 - this._distance) / 40);
    this.opacityStep = (1 / this.steps) * this.maxOpacity;
    this.opacity = this.opacityStep;
  }
  
  step(ctx: CanvasRenderingContext2D) {
    if (!this.end) {
      this._x += this.cordStepX;
      this._y += this.cordStepY;
      this.currentStep++;
      if (this.maxOpacity > this.opacity) {
        this.opacity += this.opacityStep;
      }
    }
    
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.fillRect(this._x, this._y, 2, 2);
  }

  private setCordStepDirection(scale: number) {
    const percentageX = this._x / scale;
    const percentageY = this._y / scale;

    if (percentageX < 50) {
      this.cordStepX *= -1;
    }
    
    if (percentageY < 50) {
      this.cordStepY *= -1;
    }
  }
}
