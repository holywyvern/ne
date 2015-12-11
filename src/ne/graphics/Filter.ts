module ne.graphics {

  export class Filter {

    private _gl       : WebGLRenderingContext;
    private _vertex   : Shader;
    private _fragment : Shader;

    constructor() {
      this._gl = null;
      this._vertex = new Shader(this);
      this._fragment = new Shader(this, true);
    }

    get vertex() {
      return this._vertex;
    }

    get fragment() {
      return this._fragment;
    }

    destroy() {
      this.vertex.destroy(this._gl);
      this.fragment.destroy(this._gl);
    }

    attributes(): { [s : string]: string } {
      return {};
    }

    uniforms(): { [s : string]: { type: string, value: any } } {
      return {};
    }

    varying(): { [s : string]: string } {
      return {};
    }

    compile(gl: WebGLRenderingContext) {

    }


  }

}
