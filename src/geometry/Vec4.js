ne.Vec4 = (function () {

  class Vec4 extends ne.Vec3 {

    constructor(x=0, y=0, z=0, w=0) {
      super(x, y, z);
      this.w = w;
    }

    set(x, y, z, w=undefined) {
      if (typeof w !== 'undefined') {
        this.w = w;
      }
      super.set(x, y, z);
    }

    get a() {
      return this.w;
    }

    set a(value) {
      this.w = value;
    }

    get ['3']() {
      return this.w;
    }

    set ['3'](value) {
      this.w = value;
    }

    clone() {
      return new Vec4(this.x, this.y, this.z, this.w);
    }

  }

  ne.tools.defineEscalarPorperties(Vec4.prototype, 'x', 'y', 'z', 'w');
  ne.tools.defineEscalarPorperties(Vec4.prototype, 'r', 'g', 'b', 'a');

  return Vec4;

})();
