ne.SceneShader = (function () {

  return class SceneShader extends ne.Shader {

    attributes() {
      return {
        a_position: 'vec2'
      }
    }

    uniforms() {
      return {
        u_bgColor: 'color'
      };
    }

  }

})();
