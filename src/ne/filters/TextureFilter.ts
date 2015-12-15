/// <reference path="../graphics/Filter.ts" />

module ne.filters {

  var instance : TextureFilter;

  export class TextureFilter extends graphics.Filter {

    constructor() {
      super();
      this.vertex.src = `
        v_texCoord = a_texCoord;
        gl_Position  = u_matrix * a_position;
      `;
      this.fragment.src = `
        gl_FragColor = texture2D(u_texture, v_texCoord);
      `
    }

    makeAttributes(): { [s : string]: string } {
      return {
        a_position : 'vec4',
        a_texCoord : 'vec2'
      }
    }

    makeUniforms(): { [s : string]: string } {
      return {
        u_matrix:  'mat4',
        u_texture: 'sampler2D'
      };
    }

    makeVarying(): { [s : string]: string } {
      return {
        v_texCoord: 'vec2'
      }
    }

    static get INSTANCE() {
      if (!instance) {
        instance = new TextureFilter();
      }
      return instance;
    }

  }


}
