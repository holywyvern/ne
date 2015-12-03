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
        case 'vec2': return new ne.Point(0, 0);
        case 'vec3': return new ne.Point(0, 0, 0);
        case 'vec4': return [0, 0, 0, 0];
        default:     return 0;
      }
    }

    update(gl) {
      this.updateUniforms(gl);
    }

    updateUniforms(gl) {

    }

  };

})();
