ne.ShaderBase = (function () {

  return class ShaderBase {
    constructor() {
      this.initMembers();
    }

    initMembers() {
      this._glProgram = null;
      this._glVertex = null;
      this._glFragment = null;
      this._glAttributes = {};
      this._glUniforms   = {};
    }

    vertex() {
      return "";
    }

    fragment() {
      return "";
    }

    attributes() {
      return {};
    }

    uniforms() {
      return {};
    }

    varying() {
      return {};
    }

    generate(gl) {
      if (!this._glProgram) {
        this.generateVertexShader(gl);
        this.generateFragmentShader(gl);
        this.generateProgram(gl);
        this.generateVariables(gl);
      }
      return this._glProgram;
    }

    use(gl) {
      gl.useProgram(this._glProgram);
    }

    generateVariables(gl) {
      this.generateAttributes(gl);
      this.generateUniforms(gl);
    }

    generateAttributes(gl) {
      var attributes = this.attributes();
      Object.keys(attributes).forEach( (attr) => {
        this._glAttributes[attr] = gl.getAttribLocation(this._glProgram, attr);
      } );
    }

    generateUniforms(gl) {
      var uniforms = this.attributes();
      Object.keys(uniforms).forEach( (u) => {
        this._glUniforms[u] = gl.getUniformLocation(this._glProgram, u);
      } );
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
        this._glVertex = ne.tools.gl.makeShader(gl, gl.VERTEX_SHADER, this.vertexSource());
      } catch (e) {
        this.destroy(gl);
        throw e;
      }
    }

    generateFragmentShader(gl) {
      try {
        this._glFragment = ne.tools.gl.makeShader(gl, gl.FRAGMENT_SHADER, this.fragmentSource());
      } catch (e) {
        this.destroy(gl);
        throw e;
      }
    }

    vertexSource() {
      return this.vertexHeader() + this.mainFunction(this.vertex());
    }

    fragmentSource() {
      return this.fragmentHeader() + this.mainFunction(this.fragment());
    }

    generateProgram(gl) {
      try {
        this._glProgram = ne.tools.gl.generateProgram(gl, this._glVertex, this._glFragment);
      } catch (e) {
        this.destroy(gl);
        throw e;
      }
    }

    vertexHeader() {
      return this.precision() + this.attributeSource() + this.uniformSource() + this.varyingSource();
    }

    fragmentHeader() {
      return this.precision() + this.uniformSource() + this.varyingSource();
    }

    sourceFromObject(kind, list) {
      var result = '';
      for (var a in list) {
        if (list.hasOwnProperty(a)) {
          let type = list[a];
          result += `${kind} ${type} ${a};`;
        }
      }
      return result;
    }

    updateAttributes(gl) {
      Object.keys(this._glAttributes).forEach( (name) => {
        this.updateAttribute(gl, name);
      });
    }

    updateAttribute(gl, name) {
      var location = this._glAttributes[name];
      if (location) {
        gl.enableVertexAttribArray(location);
        gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);        
      }
    }

    attributeSource() {
      return this.sourceFromObject('attribute', this.attributes());
    }

    uniformSource() {
      return this.sourceFromObject('uniform', this.uniforms());
    }

    varyingSource() {
      return this.sourceFromObject('varying', this.varying());
    }

    precision() {
      return 'precision mediump float;';
    }

    mainFunction(code) {
      return `void main(void) { ${code} }`;
    }

  }

})();
