module ne.graphics {

  interface Uniform {
    [s : string]: { type: string, value: any };
  }

  interface UnformLocations {
    [s : string]: WebGLUniformLocation;
  }

  interface AttributeLocations {
    [s : string]: number;
  }

  interface Locations {
    uniforms  : UnformLocations;
    attributes: AttributeLocations;
  }

  export class Filter {

    private _gl         : WebGLRenderingContext;
    private _vertex     : Shader;
    private _fragment   : Shader;
    private _attributes : { [s : string]: string };
    private _varying    : { [s : string]: string };
    private _uniforms   : Uniform;
    private _glProgram  : WebGLProgram;
    private _locations  : Locations;

    constructor() {
      this._gl = null;
      this._vertex = new Shader(this);
      this._fragment = new Shader(this, true);
      this._attributes = this.makeAttributes();
      this._uniforms   = this._formatUniforms(this.makeUniforms());
      this._varying    = this.makeVarying();
      this._glProgram  = null;
      this._locations  = { uniforms: {}, attributes: {} };
    }

    get vertex() {
      return this._vertex;
    }

    get fragment() {
      return this._fragment;
    }

    destroy() {
      if (this._gl) {
        this.vertex.destroy(this._gl);
        this.fragment.destroy(this._gl);
        if (this._glProgram) {
          this._gl.deleteProgram(this._glProgram);
          this._glProgram = null;
        }
      }
    }

    makeAttributes(): { [s : string]: string } {
      return {};
    }

    makeUniforms(): { [s : string]: string } {
      return {};
    }

    makeVarying(): { [s : string]: string } {
      return {};
    }

    use(gl: WebGLRenderingContext) {
      if (!this._glProgram) {
        this._compile(gl);
      }
      gl.useProgram(this._glProgram);
    }

    private _compile(gl: WebGLRenderingContext) {
      try {
        this._gl = gl;
        this._makeProgram(gl);
      } catch (e) {
        this.destroy();
        throw e;
      }
    }

    private _makeProgram(gl: WebGLRenderingContext) {
      this._glProgram = gl.createProgram();
      gl.attachShader(this._glProgram, this._vertex.compile(gl));
      gl.attachShader(this._glProgram, this._fragment.compile(gl));
      gl.linkProgram(this._glProgram);
      this._checkProgram(gl);
      this._getLocations(gl);
    }

    private _getLocations(gl: WebGLRenderingContext) {
      this._getUniformLocations(gl);
      this._getAttributeLocations(gl);
    }

    private _getUniformLocations(gl: WebGLRenderingContext) {
      Object.keys(this.uniforms).forEach(u => {
          this._locations.uniforms[u] = gl.getUniformLocation(this._glProgram, u);
      });
    }

    private _getAttributeLocations(gl: WebGLRenderingContext) {
      Object.keys(this.attributes).forEach(a => {
          this._locations.attributes[a] = gl.getAttribLocation(this._glProgram, a);
      });
    }

    private _checkProgram(gl: WebGLRenderingContext) {
      var success = gl.getProgramParameter(this._glProgram, gl.LINK_STATUS);
      if (!success) {
         throw new Error("program filed to link:" + gl.getProgramInfoLog (this._glProgram));
      }
    }

    private _formatUniforms(u : { [s : string]: string }) {
      var result: Uniform = {};
      Object.keys(u)
        .forEach((key) => {
          var type = u[key];
          result[key] = { type: Filter.TYPES[type], value: Filter.DEFAULTS[type]() };
        }) ;
      return result;
    }

    get uniforms(): { [s : string]: { type: string, value: any } } {
      return this._uniforms;
    }

    get attributes() {
      return this._attributes;
    }

    get varying() {
      return this._varying;
    }

    public static TYPES = {
      number: 'float',
      float:  'float',
      vec2:   'vec2',
      vec3:   'vec3',
      vec4:   'vec4',
      mat2:   'mat2',
      mat3:   'mat3',
      mat4:   'mat4',
      color:  'vec4',
      rect:   'vec4',
      point:  'vec3',
      sampler2d: 'sampler2d',
      texture:   'sampler2d'
    }

    public static DEFAULTS = {
      number:    () => 0,
      float:     () => 0,
      mat2:      () => new math.Matrix2(),
      mat3:      () => new math.Matrix3(),
      mat4:      () => new math.Matrix4(),
      vec2:      () => new math.Vector2(),
      vec3:      () => new math.Vector3(),
      vec4:      () => new math.Vector4(),
      color:     () => new Color(),
      rect:      () => new Rect(),
      point:     () => new Point(),
      sampler2d: () => null,
      texture:   () => null,
    };

    public static UPDATE = {
      number(gl: WebGLRenderingContext, location: WebGLUniformLocation, value: number) {
        gl.uniform1f(location, value);
      },
      float(gl: WebGLRenderingContext, location: WebGLUniformLocation, value: number) {
        gl.uniform1f(location, value);
      },
      mat2(gl: WebGLRenderingContext, location: WebGLUniformLocation, value: math.Matrix2) {
        gl.uniformMatrix2fv(location, false, value.data);
      },
      mat3(gl: WebGLRenderingContext, location: WebGLUniformLocation, value: math.Matrix3) {
        gl.uniformMatrix3fv(location, false, value.data);
      },
      mat4(gl: WebGLRenderingContext, location: WebGLUniformLocation, value: math.Matrix4) {
        gl.uniformMatrix4fv(location, false, value.data);
      },
      vec2(gl: WebGLRenderingContext, location: WebGLUniformLocation, value: math.Vector2) {
        gl.uniform2fv(location, value.data);
      },
      vec3(gl: WebGLRenderingContext, location: WebGLUniformLocation, value: math.Vector3) {
        gl.uniform3fv(location, value.data);
      },
      vec4(gl: WebGLRenderingContext, location: WebGLUniformLocation, value: math.Vector4) {
        gl.uniform4fv(location, value.data);
      },
      color(gl: WebGLRenderingContext, location: WebGLUniformLocation, value: math.Vector4) {
        gl.uniform4fv(location, value.data);
      },
      rect(gl: WebGLRenderingContext, location: WebGLUniformLocation, value: math.Vector4) {
        gl.uniform4fv(location, value.data);
      },
      point(gl: WebGLRenderingContext, location: WebGLUniformLocation, value: math.Vector3) {
        gl.uniform3fv(location, value.data);
      },
      sampler2d(gl: WebGLRenderingContext, location: WebGLUniformLocation, value: Texture) {
        if (value) {
        }
      },
      texture(gl: WebGLRenderingContext, location: WebGLUniformLocation, value: Texture) {
        if (value) {
        }
      }
    }

  }



}
