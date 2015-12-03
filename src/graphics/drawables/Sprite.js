ne.Sprite = (function () {

  return class Sprite extends ne.Drawable {

    constructor() {
      super();
      this.position = new ne.Point();
      this.scale    = new ne.Point(1, 1);
      this.offset   = new ne.Point();
      this.shader   = new ne.SpriteShader();
    }

  }

})();
