/// <reference path="../DrawableContainer.ts" />
/// <reference path="../../graphics/Rect.ts" />

module ne.objects {

  export class Viewport extends DrawableContainer {

    public rect : graphics.Rect;

    constructor(rect : graphics.Rect = null) {
      super();
      this.rect = rect || new graphics.Rect();
    }

    prepare(render: graphics.WebGLRender) {
      render.prepareRectBuffer(this.rect);
    }

  }

}
