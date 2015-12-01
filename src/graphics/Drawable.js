
ne.Drawable = (function () {

  return class Drawable {

    constructor() {
      this._parent = null;
      this.z = 0;
    }

    get parent() {
      return this._parent;
    }

    get z() {
      return this._z;
    }

    set z(value) {
      this._z = value;
      var parent = this.parent;
      if (parent) {
        parent.zUpdate();
      }
    }

    render(renderer) {

    }

    act(delta) {

    }

  };

})();
