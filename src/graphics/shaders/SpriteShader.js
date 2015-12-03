ne.SpriteShader = (function () {

  return class SpriteShader extends ne.Shader {

    vertex() {
      return "gl_Position = vec4(a_position, 0, 1);";
    }

    fragment() {
      return "gl_FragColor = vec4(0, 1, 0, 1);";
    }

    attributes() {
      return {
        a_position: 'vec2'
      };
    }

    uniforms() {
      return {};
    }

    varying() {
      return {};
    }

  }

})();
