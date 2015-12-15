/// <reference path="../Drawable.ts" />

module ne.objects {

  export class Sprite extends Drawable {

    public filter     : graphics.Filter;
    private _position : math.Vector2;
    public texture    : graphics.Texture;
    public frame      : graphics.Rect;

    constructor() {
      super();
      this.filter    = null;
      this.texture   = null;
      this._position = new math.Vector2();
      this.frame     = new graphics.Rect();
    }

    get position() {
      return this._position;
    }

    render(render: graphics.WebGLRender) {
      if (!this.isDrawable()) return;
      this._useFilter(render);
      this.parent.prepare(render);
      this.texture.bind(render.gl, this.frame);
    }

    protected _useFilter(render: graphics.WebGLRender) {
      if (this.filter) {
        this.filter.use(render.gl);
      }
    }

    isDrawable() {
      return this.visible && (this.texture !== null);
    }

  }

}
