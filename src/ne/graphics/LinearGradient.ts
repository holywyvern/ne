/// <reference path="./Color.ts" />
/// <reference path="./Gradient.ts" />

module ne.graphics {

  export class LinearGradient extends Gradient {

    angle: number;

    constructor(angle:number=0) {
      super()
      this.angle = angle;
    }

    createGradient(w:number, h:number, context:CanvasRenderingContext2D): CanvasGradient {
      var a = this.angle * Math.PI / 180;
      var s = Math.sin(a);
      var c = Math.cos(a);
      var x = w * c * c + h * s * s;
      var y = h * c * c + w * s * s;
      return context.createLinearGradient(0, 0, x, y);
    }

  }

}
