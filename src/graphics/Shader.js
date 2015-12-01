ne.Shader = (function () {

  return class Shader {
    constructor() {
      this.vertex  = "";
      this.fragment = "";
      this._glProgram = null;
      this._glVertex = null;
      this._glFragment = null;
    }

    get attributes() {
      return {};
    }

    get uniforms() {
      return {};
    }

    get varying() {
      return {};
    }

    generate(gl) {
      if (!this._glProgram) {
        this.generateVertexShader(gl);
        this.generateFragmentShader(gl);
        this.generateProgram(gl);
      }
      return this._glProgram;
    }

    destroy(gl) {
      this.destroyVertexShader(gl);
      this.destroyFragmentShader(gl);
      this.destroyProgram(gl);
    }

    destroyVertexShader(gl) {
      if (this._glVertex) {
        if (this._glProgram) {
          gl.detachShader(this._glProgram, this._glVertex);
          gl.destroyShader(this._glVertex);
        }
        this._glVertex = null;
      }
    }

    destroyFragmentShader(gl) {
      if (this._glFragment) {
        if (this._glProgram) {
          gl.detachShader(this._glProgram, this._glFragment);
          gl.destroyShader(this._glFragment);
        }
        this._glVertex = null;
      }
    }

    destroyProgram(gl) {
      if (this._glProgram) {
        gl.destroyProgram(this._glProgram);
        this._glProgram = null;
      }
    }

    generateVertexShader(gl) {
      try {
        this._glVertex = ne.tools.gl.makeShader(gl, gl.VERTEX_SHADER, this.vertexSource);
      } catch (e) {
        this.destroy(gl);
        throw e;
      }
    }

    generateFragmentShader(gl) {
      try {
        this._glFragment = ne.tools.gl.makeShader(gl, gl.FRAGMENT_SHADER, this.fragmentSource);
      } catch (e) {
        this.destroy(gl);
        throw e;
      }
    }

    get vertexSource() {
      return this.vertexHeader + this.mainFunction(this.vertex);
    }

    get fragmentSource() {
      return this.fragmentHeader + this.mainFunction(this.fragment);
    }

    generateProgram(gl) {
      try {
        this._glProgram = ne.tools.gl.generateProgram(gl, this._glVertex, this._glFragment);
      } catch (e) {
        this.destroy(gl);
        throw e;
      }
    }

    get vertexHeader() {
      return this.precision + this.attributeSource + this.uniformSource + this.varyingSource;
    }

    get fragmentHeader() {
      return this.precision + this.uniformSource + this.varyingSource;
    }

    sourceFromObject(list) {
      var result = '';
      for (var a in list) {
        if (list.hasOwnProperty(a)) {
          let type = list[a];
          result += `${type} ${a};`;
        }
      }
      return result;
    }

    get attributeSource() {
      return this.sourceFromObject(this.attributes);
    }

    get uniformSource() {
      return this.sourceFromObject(this.uniforms);
    }

    get varyingSource() {
      return this.sourceFromObject(this.varying);
    }

    get precision() {
      return 'precision mediump float;';
    }

    mainFunction(code) {
      return 'void main(void) {' + code + '}';
    }

  }

})();
