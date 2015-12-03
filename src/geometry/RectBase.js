ne.RectBase = (function () {

  class RectBase extends ne.Vec4 {

    constructor(x=0, y=0, w=0, h=0) {
      super(x, y, h, w);
    }

    get width() {
      return this.w;
    }

    set width(value) {
      this.w = value;
    }

    get height() {
      return this.z;
    }

    set height(value) {
      this.z = value;
    }

    get h() {
      return this.z;
    }

    set h(value) {
      this.z = value;
    }

    set(x, y, w, h) {
      super.set(x, y, h, w);
    }

    get ['2']() {
      return this.w;
    }

    set ['2'](value) {
      this.w = value;
    }

    get ['3']() {
      return this.h;
    }

    set ['3'](value) {
      this.h = value;
    }

    clone() {
      return new RectBase(this.x, this.y, this.width, this.height);
    }

  }

  ne.tools.defineEscalarPorperties(RectBase.prototype, 'x', 'y', 'w', 'h');

  return RectBase;

})();
