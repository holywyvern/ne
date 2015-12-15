/// <reference path="../Drawable.ts" />

module ne.objects {

  export class Sprite extends Drawable {

    public filter     : graphics.Filter;
    private _position : math.Vector2;
    private _texture  : graphics.Texture;
    public frame      : graphics.Rect;

    constructor() {
      super();
      this.filter    = ne.filters.TextureFilter.INSTANCE;
      this.texture   = null;
      this._position = new math.Vector2();
      this.frame     = new graphics.Rect();
    }

    get texture() {
      return this._texture;
    }

    set texture(value) {
      if (value !== this._texture) {
        this._texture = value;
        if (value) {
          this.frame = value.rect;
        }
      }
    }

    get position() {
      return this._position;
    }

    render(render: graphics.WebGLRender) {
      if (!this.isDrawable()) return;
      var gl = render.gl;
      this.filter.use(gl);
      this.parent.prepare(render);
      this.filter.updateAttribute('a_position', 3);
      this.texture.bind(gl, this.frame);
      this.filter.updateAttribute('a_texCoord', 2);
      this.filter.updateUniforms();
      utils.gl.drawTriangles(gl, 2);
    }

    isDrawable() {
      return this.visible && (this.texture !== null);
    }

  }

}
