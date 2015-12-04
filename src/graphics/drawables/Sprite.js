ne.Sprite = (function () {

  return class Sprite extends ne.Actor {

    constructor() {
      super();
    }

    initMembers() {
      super.initMembers();
      this.position = new ne.Point();
      this.scale    = new ne.Point(1, 1);
      this.offset   = new ne.Point();
      this.shader   = new ne.SpriteShader();
    }

    get x() {
      return this.position.x;
    }

    get y() {
      return this.position.y;
    }

    set x(value) {
      this.position.x = value;
    }

    set y(value) {
      this.position.y = value;
    }

    move(x, y, time=0, mode=null) {
      this.twig({x: x, y: y}, time, mode);
    }

  }

})();
