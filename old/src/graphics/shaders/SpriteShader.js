ne.SpriteShader = (function () {

  var instance = null;

  return class SpriteShader extends ne.Shader {

    vertex() {
      return `
        // rotates the texture
        vec2 point = a_position;
        vec2 size = u_resolution * u_resolution / u_frame.zw;

        vec2 position = (u_matrix * vec3(a_position, 1.0)).xy / size;
        // convert from 0->1 to 0->2
        vec2 zeroToTwo = position * 2.0;
        // convert from 0->2 to -1->+1 (clipspace)
        vec2 clipSpace = zeroToTwo - 1.0;
        v_texCoord = a_texCoord;
        gl_Position = vec4(clipSpace * vec2(1, -1.0), 0, 1.0);
      `;
    }

    fragment() {
      return `
        float avg = 0.2126 * (u_tone.r) + 0.7152 * (u_tone.g) + 0.0722 * (u_tone.b);
        vec4 texColor = texture2D(u_texture, v_texCoord);
        vec4 grayScale = vec4(avg, avg, avg, texColor[3]) * u_tone[3];
        vec4 tinted = vec4(u_tone.rgb, 0.0);
        gl_FragColor = ( tinted + texColor * (1.0 - u_tone.a) + grayScale);
      `;
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
        u_tone: 'tone',
        u_matrix: 'mat3',
        u_frame: 'rect'
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
