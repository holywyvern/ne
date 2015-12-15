/// <reference path="./Render.ts" />

module ne.graphics {

  export class Canvas2DRender extends Render {

    constructor(options : GameOptions) {
      super(options.width, options.height);
    }

  }

}
