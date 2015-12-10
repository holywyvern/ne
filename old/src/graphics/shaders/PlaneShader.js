ne.PlaneShader = (function () {

  var _shader = null;

  class PlaneShader extends ne.SpriteShader {

    static get INSTANCE() {
      if (_shader === null) {
        _shader = new PlaneShader();
      }
      return _shader;
    }

  }

  return PlaneShader;

 })();
