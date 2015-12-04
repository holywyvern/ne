ne.SceneShader = (function () {

  return class SceneShader extends ne.Shader {

    vertex() {
      return "gl_Position = vec4(a_position, 0, 1);";
    }

    fragment() {
      return "gl_FragColor = u_bgColor;";
    }

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
