ne.SpriteShader = (function () {

  return class SpriteShader extends ne.Shader {

    vertex() {
      return [
        // rotates the texture
        "float rx = sin(u_rotation);",
        "float ry = cos(u_rotation);",
        "vec2 rotation = vec2(",
          "a_texCoord.x * ry + a_texCoord.y * rx,",
          "a_texCoord.y * ry - a_texCoord.x * rx",
        ");",
        // convert the rectangle from pixels to 0.0 to 1.0
        "vec2 zeroToOne = (rotation * u_textureSize  + u_position) / u_resolution;",
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
        u_position: 'point',
        u_scale: 'point',
        u_offset: 'point',
        u_resolution: 'point',
        u_textureSize: 'vec2',
        u_rotation: 'float'
      };
    }

    varying() {
      return {
        v_texCoord: 'point'
      };
    }

  }

})();
