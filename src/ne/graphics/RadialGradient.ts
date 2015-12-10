/// <reference path="./Color.ts" />
/// <reference path="./Gradient.ts" />
/// <reference path="./Position.ts" />

module ne.graphics {

  export class RadialGradient extends Gradient {

    startRadius: number;
    endRadius:   number;
    position:    PositionValue;

    constructor(startRadius=0, endRadius=1, position = Position.MIDDLE) {
      super()
      this.startRadius = startRadius;
      this.endRadius   = endRadius;
      this.position    = position;
    }

    createGradient(w:number, h:number, context:CanvasRenderingContext2D): CanvasGradient {
      var [x, y] = this.position(w, h);
      return context.createRadialGradient(x, y, this.startRadius * x, w, h, this.endRadius * y);
    }

    getAngle() {
      switch (Position) {
        default:
      }
    }

  }

}
