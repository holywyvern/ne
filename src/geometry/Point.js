ne.Point = (function () {

  class Point extends ne.Vec2 {

    constructor(x=0, y=0, z=null) {
      super(x, y);
      this.z = z;
    }

    set(x, y, z=undefined) {
      this.x = x;
      this.y = y;
      this.z = typeof z == 'undefined' ? z : this.z;
    }

    get dimensions() {
      return z === null ? 2 : 3;
    }

    get ['2']() {
      return this.z;
    }

    set ['2'](value) {
      this.z = value;
    }

    clone() {
      return new Point(this.x, this.y, this.z);
    }

  }

  ne.tools.defineEscalarPorperties(Point.prototype, 'x', 'y', 'z');

  return Point;

})();
