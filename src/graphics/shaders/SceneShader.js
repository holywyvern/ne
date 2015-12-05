ne.SceneShader = (function () {

  return class SceneShader extends ne.Shader {

    vertex() {
      return [
        "gl_Position = vec4((u_matrix * vec3(a_position, 1)).xy, 0, 1);"
      ].join('\n');
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
        u_bgColor: 'color',
        u_matrix:  'mat3'
      };
    }

  }

})();
