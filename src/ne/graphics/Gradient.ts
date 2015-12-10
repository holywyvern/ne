/// <reference path="./Color.ts" />

module ne.graphics {

  export interface ColorStop {
    color:   Color;
    percent: number;
  }

  export class Gradient {

    private __stops: ColorStop[];

    constructor() {
      this.__stops = [];
    }

    protected get _stops(): ColorStop[] {
      return this._stops;
    }

    addColorStop(percent:number, color: Color) {
      this._stops.push({color, percent});
    }

    toStyle(w:number, h:number, context:CanvasRenderingContext2D): string | CanvasGradient | CanvasPattern {
      var style = this.createGradient(w, h, context);
      this._stops.forEach(function (c) {
        style.addColorStop(c.percent, c.color.toCss());
      });
      return style;
    }

    createGradient(w:number, h:number, context:CanvasRenderingContext2D): CanvasGradient {
      return null;
    }

  }

}
