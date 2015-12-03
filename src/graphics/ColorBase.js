
ne.ColorBase = (function () {

  class ColorBase extends ne.Vec4 {

    constructor(r=0, g=0, b=0, a=255) {
      super(r, g, b, a);
    }

    get x() {
      return this.red;
    }

    set x(value) {
      this.red = value;
    }

    get y() {
      return this.green;
    }

    set y(value) {
      this.green = value;
    }

    get z() {
      return this.blue;
    }

    set z(value) {
      this.blue = value;
    }

    get w() {
      return this.alpha;
    }

    set w(value) {
      this.alpha = value;
    }

    set(r, g, b, a=undefined) {
      if (typeof a == 'undefined') a = this.alpha;
      super.set(r, g, b, a);
      return this;
    }

    clone() {
      return new ColorBase(this.red, this.green, this.blue, this.alpha);
    }

    get red() {
      return this._r;
    }

    get green() {
      return this._g;
    }

    get blue() {
      return this._b;
    }

    get alpha() {
      return this._a;
    }

    set red(value) {
      this._r = Math.max(0, Math.min(255, value));
    }

    set green(value) {
      this._g = Math.max(0, Math.min(255, value));
    }

    set blue(value) {
      this._b = Math.max(0, Math.min(255, value));
    }

    set alpha(value) {
      this._a = Math.max(0, Math.min(255, value));
    }

    get hue() {
      return this.toHsl()[0];
    }

    set hue(value) {
      var hsla = this.toHsla();
      hsla[0] = value;
      var c = Color.fromHsla(hsla);
      this.set(c.red, c.green, c.blue, c.alpha);
    }

    get saturation() {
      return this.toHsl()[1];
    }

    set saturation(value) {
      var hsla = this.toHsla();
      hsla[1] = value;
      var c = Color.fromHsla(hsla);
      this.set(c.red, c.green, c.blue, c.alpha);
    }

    get luminance() {
      return this.toHsl()[2];
    }

    set luminance(value) {
      var hsla = this.toHsla();
      hsla[2] = value;
      var c = Color.fromHsla(hsla);
      this.set(c.red, c.green, c.blue, c.alpha);
    }

  }

  return ColorBase;

})();
