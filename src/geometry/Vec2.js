ne.Vec2 = (function () {

  class Vec2 {

    constructor(x=0, y=0) {
      this.x = x;
      this.y = y;
    }

    [Symbol.iterator]() {
      var index = -1;
      var data  = [];
      var length = this.length;
      for (var i = 0; i < length; ++i) {
        data.push(this[i]);
      }
      return {
        next: () => ({ value: data[++index], done: index >= length })
      };
    };

    get length() {
      return 2;
    }

    get ['0']() {
      return this.x;
    }

    set ['0'](value) {
      this.x = value;
    }

    get ['1']() {
      return this.y;
    }

    set ['1'](value) {
      this.y = value;
    }

    get ['2']() {
      return this.z;
    }

    get r() {
      return this.x;
    }

    set r(value) {
      this.x = value;
    }

    get s() {
      return this.y;
    }

    set s(value) {
      this.y = value;
    }

    get u() {
      return this.x;
    }

    set u(value) {
      this.x = value;
    }

    get v() {
      return this.y;
    }

    set v(value) {
      this.y = value;
    }

    get g() {
      return this.y;
    }

    set g(value) {
      this.y = value;
    }

    clone() {
      return new Vec2(this.x, this.y);
    }

    set(x, y) {
      this.x = x;
      this.y = y;
    }

  }

  ne.tools.defineEscalarPorperties(Vec2.prototype, 'x', 'y');
  ne.tools.defineEscalarPorperties(Vec2.prototype, 'r', 's');
  ne.tools.defineEscalarPorperties(Vec2.prototype, 'r', 'g');
  ne.tools.defineEscalarPorperties(Vec2.prototype, 'u', 'v');

  return Vec2;

})();
