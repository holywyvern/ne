module ne.graphics {

  export class Shader {

    public src        : string;
    private _glShader : WebGLShader;
    private _fragment : boolean;
    private _filter   : Filter;

    constructor(filter: Filter, fragment=false) {
      this.src = '';
      this._glShader = null;
      this._fragment = fragment;
      this._filter   = filter;
    }

    get fragment() {
      return this._fragment;
    }

    get generatedSource() {
      var head = this._makeHead();
      var vars = this._makeVariables();
      return `${head}${vars}\nvoid main(void) {\n${ this.src }\n}`;
    }

    destroy(gl: WebGLRenderingContext) {
      if (this._glShader) {
        gl.deleteShader(this._glShader);
        this._glShader = null;
      }
    }

    compile(gl: WebGLRenderingContext) {
      if (this._glShader === null) {
        var type = this.fragment ? gl.FRAGMENT_SHADER : gl.VERTEX_SHADER;
        this._glShader = gl.createShader(type);
        gl.shaderSource(this._glShader, this.generatedSource);
        gl.compileShader(this._glShader);
      }
      this._validateShader(gl);
      return this._glShader;
    }

    private _validateShader(gl: WebGLRenderingContext) {
      var success = gl.getShaderParameter(this._glShader, gl.COMPILE_STATUS);
      if (!success) {
        // Something went wrong during compilation; get the error
        var info = gl.getShaderInfoLog(this._glShader);
        var source = this.generatedSource;
        var err = `Could not compile shader: ${info}\nSource:\n${source}`;
        this.destroy(gl);
        throw new Error(err);
      }
    }

    private _makeHead() {
      return 'precision mediump float;\n';
    }

    private _makeVariables() {
      if (this.fragment) {
        return this._mapFragmentVariables();
      }
      return this._mapVertexVariables();
    }

    private _mapAttributes() {
      var attr = this._filter.attributes;
      return Object.keys(attr)
        .map((k) => {
          return `attribute ${attr[k]} ${k};\n`;
        })
        .join('\n');
    }

    private _mapUniforms() {
      var attr = this._filter.uniforms;
      return Object.keys(attr)
        .map((k) => {
          return `uniform ${attr[k].type} ${k};\n`;
        })
        .join('\n');
    }

    private _mapVarying() {
      var attr = this._filter.varying;
      return Object.keys(attr)
        .map((k) => {
          return `varying ${attr[k]} ${k};\n`;
        })
        .join('\n');
    }

    private _mapVertexVariables() {
      return this._mapAttributes() + this._mapUniforms() + this._mapVarying();
    }

    private _mapFragmentVariables() {
      return this._mapUniforms() + this._mapVarying();
    }

  }

}
