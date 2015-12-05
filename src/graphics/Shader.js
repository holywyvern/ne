ne.Shader = (function () {

  return class Shader extends ne.ShaderBase {

    constructor() {
      super();
    }

    initMembers() {
      super.initMembers();
      this._values = this._defaultSet(this.uniforms());
    }

    get uniformValues() {
      return this._values;
    }

    _defaultSet(set) {
      var result = {};
      Object.keys(set).forEach((i) => {
        result[i] = this._getDefaultValue(set[i]);
      });
      return result;
    }

    _getDefaultValue(type) {
      if (typeof ne.ShaderBase.VALUES[type] == 'undefined') {
        return null;
      }
      return ne.ShaderBase.VALUES[type]();
    }

    update(gl) {
      this.updateUniforms(gl);
    }

    updateUniforms(gl) {
      var values = this.uniformValues;
      var types = this.uniforms();
      Object.keys(values).forEach((u) => {
        this.updateUniform(gl, u, types[u], values[u]);
      });
    }

    updateUniform(gl, name, type, value) {
      var location = this._glUniforms[name];
      if (typeof location != 'undefined' && value !== null) {
        if (typeof ne.ShaderBase.UNIFORM_SET[type] !== 'undefined') {
          ne.ShaderBase.UNIFORM_SET[type](gl, location, value)
        }
      }
    }

    updateUniformByType(gl, location, type, value) {
      switch (type) {
        case 'float': case 'number': case 'real':
          gl.uniform1f(location, value);
          break;
        case 'vec2':
          gl.uniform2f(location, value[0], value[1]);
          break;
        case 'vec3':
          gl.uniform3f(location, value[0], value[1], value[2]);
          break;
        case 'vec4':
          gl.uniform4f(location, value[0], value[1], value[2], value[3]);
          break;
        case 'point':
          gl.uniform2f(location, value.x, value.y);
          break;
        case 'rect':
          gl.uniform4f(location, value.x, value.y, value.width, value.height);
          break;
        case 'color':
          gl.uniform4f(location, value.red / 255, value.green / 255, value.blue / 255, value.alpha / 255);
          break;
        case 'array':
          gl['uniform' + value.length + 'f'](location, ...value);
        default:
            break;
      }
    }

  };

})();
