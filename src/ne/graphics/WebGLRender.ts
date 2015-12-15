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
      utils.gl.bindBuffer(this.gl, this._buffer, rect);
    }

  }

}
