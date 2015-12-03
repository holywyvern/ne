ne.Vec3 = (function () {

  class Vec3 extends ne.Vec2 {

    constructor(x=0, y=0, z=0) {
      super(x, y);
      this.z = z;
    }

    get length() {
      return 3;
    }

    get ['2']() {
      return this.z;
    }

    set ['2'](value) {
      this.z = value;
    }

    get b() {
      return this.z;
    }

    set b(value) {
      this.z = value;
    }

    clone() {
      return new Vec3(this.x, this.y, this.z);
    }

    set(x, y, z=undefined) {
      if (typeof z !== 'undefined') {
        this.z = z;
      }
      super.set(x, y);
    }

  }

  ne.tools.defineEscalarPorperties(Vec3.prototype, 'x', 'y', 'z');
  ne.tools.defineEscalarPorperties(Vec3.prototype, 'r', 'g', 'b');

  return Vec3;

})();
