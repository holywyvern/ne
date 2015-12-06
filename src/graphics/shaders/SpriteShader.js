ne.SpriteShader = (function () {

  var instance = null;

  return class SpriteShader extends ne.Shader {

    vertex() {
      return [
        // rotates the texture
        "vec2 point = a_position;",
        "vec2 size = u_resolution * (u_resolution / u_textureSize);",
        "vec2 position = (u_matrix * vec3(a_position, 1)).xy / size;",
        // convert the rectangle from pixels to 0.0 to 1.0
        "vec2 zeroToOne = position;",
        // convert from 0->1 to 0->2
        "vec2 zeroToTwo = zeroToOne * 2.0;",
        // convert from 0->2 to -1->+1 (clipspace)
        "vec2 clipSpace = zeroToTwo - 1.0;",
        "v_texCoord = a_texCoord;",
        "gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);"
      ].join('\n');
    }

    fragment() {
      return "gl_FragColor = texture2D(u_texture, v_texCoord);";
    }

    attributes() {
      return {
        a_position: 'vec2',
        a_texCoord: 'point'
      };
    }

    uniforms() {
      return {
        u_texture: 'sampler2D',
        u_textureSize: 'vec2',
        u_resolution:  'vec2',
        u_matrix: 'mat3'
      };
    }

    varying() {
      return {
        v_texCoord: 'point'
      };
    }

    static get INSTANCE() {
      if (instance === null) {
        instance = new ne.SpriteShader();
      }
      return instance;
    }

  }

})();
