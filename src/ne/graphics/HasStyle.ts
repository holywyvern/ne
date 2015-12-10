module ne.graphics {

  export interface HasStyle {
    toStyle(w:number, h:number, context:CanvasRenderingContext2D): string | CanvasGradient | CanvasPattern;
  }

}
