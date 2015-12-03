ne.SceneShader = (function () {

  return class SceneShader extends ne.Shader {

    uniforms() {
      return {
        u_bgColor: 'color'
      };
    }

  }

})();
