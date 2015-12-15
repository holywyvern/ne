/// <reference path="./Render.ts" />

module ne.graphics {

  export class WebGLRender extends Render {

    private _gl: WebGLRenderingContext;

    constructor(options : GameOptions) {
      super(options.width, options.height);
      this._createContext();
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

    get gl() {
      return this._gl;
    }

    render(object: RenderObject) {
      object.render(this._gl);
    }

  }

}
