module ne.graphics {

  export module PatternRepeat {
    export var BOTH = 'repeat';
    export var X    = 'repeat-x';
    export var Y    = 'repeat-y';
    export var NONE = 'no-repeat';
  }

  export class Pattern {

    public pixmap: Pixmap;
    public repeat: string;

    constructor(pixmap: Pixmap, repeat:string=PatternRepeat.BOTH) {
      this.pixmap = pixmap;
      this.repeat = repeat;
    }

    toStyle(w:number, h:number, context:CanvasRenderingContext2D): string | CanvasGradient | CanvasPattern {
      var repeat = '';
      context.createPattern(this.pixmap.canvas, repeat);
      return null;
    }

  }

}
