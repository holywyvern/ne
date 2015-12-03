ne.Point = (function () {

  return class Point {

    constructor(x=0, y=0, z=null) {
      this.x = x;
      this.y = y;
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

  }

})();
