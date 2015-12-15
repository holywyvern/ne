/// <reference path="../graphics/Filter.ts" />

module ne.filters {

  var instance : TextureFilter;

  export class TextureFilter extends graphics.Filter {

    constructor() {
      super();
      this.vertex.src   = 'gl_Position  = u_matrix * a_position;';
      this.fragment.src = 'gl_FragColor = vec4(1, 0, 0, 1);'
    }

    makeAttributes(): { [s : string]: string } {
      return {
        a_position : 'vec4'
      }
    }

    makeUniforms(): { [s : string]: string } {
      return {
        u_matrix: 'mat4'
      };
    }

    static get INSTANCE() {
      if (!instance) {
        instance = new TextureFilter();
      }
      return instance;
    }

  }


}
