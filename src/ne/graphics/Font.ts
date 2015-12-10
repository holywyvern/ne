module ne.graphics {

  export class Font {

    static DEFAULT_STROKE_STYLE = Color.TRANSPARENT;
    static DEFAULT_FILL_STYLE   = Color.BLACK;
    static DEFAULT_SIZE         = 24;
    static DEFAULT_FAMILY       = 'monospace';

    strokeStyle: HasStyle;
    fillStyle:   HasStyle;
    size:        number;
    private     _family:  string;

    constructor(family= Font.DEFAULT_FAMILY, size=Font.DEFAULT_SIZE) {
      this.strokeStyle = Font.DEFAULT_STROKE_STYLE;
      this.fillStyle   = Font.DEFAULT_FILL_STYLE;
      this.family      = family;
      this.size        = size;
    }

    get family() {
      return this._family.split(' ');
    }

    set family(value:string | string[]) {
      if (typeof value == 'string') {
        this._family = <string>value;
      } else {
        this._family = (<string[]>value).join(' ');
      }
    }

  }

}
