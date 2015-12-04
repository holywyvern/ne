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
      switch (type) {
        case 'point':                             return new ne.Point(0, 0);
        case '3d-point':                          return new ne.Point(0, 0, 0);
        case 'color':                             return new ne.Color(0, 0, 0);
        case 'rect':                              return new ne.Rect();
        case 'number': case 'float': case 'real': return 0;
        case 'vec2':                              return new ne.Vec2();
        case 'vec3':                              return new ne.Vec3();
        case 'vec4':                              return new ne.Vec4();
        case 'array':                             return  [0, 0, 0, 0];
        default:                                  return 0;
      }
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
      if (typeof location != 'undefined') {
        this.updateUniformByType(gl, location, type, value);
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
