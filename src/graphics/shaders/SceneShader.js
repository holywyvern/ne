ne.SceneShader = (function () {

  return class SceneShader extends ne.Shader {

    vertex() {
      return [
        // convert the rectangle from pixels to 0.0 to 1.0
        "vec2 zeroToOne = a_position / u_resolution;",
        // convert from 0->1 to 0->2
        "vec2 zeroToTwo = zeroToOne * 2.0;",
        // convert from 0->2 to -1->+1 (clipspace)
        "vec2 clipSpace = zeroToTwo - 1.0;",
        "gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);"
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
        u_bgColor:    'color',
        u_resolution: 'point'
      };
    }

  }

})();
