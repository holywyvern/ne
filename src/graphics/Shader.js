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
        case 'vec2':                              return [0, 0];
        case 'vec3':                              return [0, 0, 0];
        case 'array':case 'vec4':                 return [0, 0, 0, 0];
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
      if (location) {
        this.updateUniformByType(gl, location, value);
      }
    }

  };

})();
