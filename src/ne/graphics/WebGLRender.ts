/// <reference path="./Render.ts" />

module ne.graphics {

  export class WebGLRender extends Render {

    private _gl: WebGLRenderingContext;
    private _buffer : WebGLBuffer;

    constructor(options : GameOptions) {
      super(options.width, options.height);
      this._createContext();
      this._createBuffer();
    }

    private _createContext() {
      this._gl = <WebGLRenderingContext>this.canvas.getContext('webgl');
      if (!this._gl) {
        this._gl = this.canvas.getContext('experimental-webgl');
      }
      if (!this._gl) {
        throw new Error("Your browser doesn't support WebGL.");
      }
    }

    private _createBuffer() {
      this._buffer = this.gl.createBuffer();
    }

    get gl() {
      return this._gl;
    }

    render(object: RenderObject) {
      object.render(this);
    }

    prepareRectBuffer(rect : graphics.Rect) {
      var x1 = rect.x;
      var x2 = rect.x + rect.width;
      var y1 = rect.y;
      var y2 = rect.y + rect.height;
      var data = new Float32Array([ x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2 ]);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this._buffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);
    }

  }

}
