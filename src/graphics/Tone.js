ne.Tone = (function () {

  class Tone extends ne.Vec4 {

    constructor(r=0, g=0, b=0, a=0) {
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
      this.blue =  value;
    }

    get w() {
      return this.gray;
    }

    set w(value) {
      this.gray =  value;
    }

    set(r, g, b, a=undefined) {
      if (typeof a == 'undefined') a = this.gray;
      super.set(r, g, b, a);
      return this;
    }

    get red() {
      return this._red;
    }

    get green() {
      return this._green;
    }

    get blue() {
      return this._blue;
    }

    get gray() {
      return this._gray;
    }

    get grey() {
      return this.gray;
    }

    set red(value) {
      this._red = Math.max(-255, Math.min(255, value));
    }

    set green(value) {
      this._green = Math.max(-255, Math.min(255, value));
    }

    set blue(value) {
      this._blue = Math.max(-255, Math.min(255, value));
    }

    set gray(value) {
      this._gray = Math.max(0, Math.min(255, value));
    }

    set grey(value) {
      this.gray = value;
    }

    static get RANDOM() {
      var red   = Math.floor(Math.random() * 512 - 255);
      var green = Math.floor(Math.random() * 512 - 255);
      var blue  = Math.floor(Math.random() * 512 - 255);
      var gray  = Math.floor(Math.random() * 256);
      return new Tone(red, green, blue, gray);
    }

  }

  return Tone;

})();
