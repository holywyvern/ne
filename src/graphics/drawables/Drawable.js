
ne.Drawable = (function () {

  return class Drawable extends ne.EventManager {

    constructor() {
      super();
      this.initMembers();
    }

    initMembers() {
      this._parent = null;
      this.z = 0;
      this.visible = true;
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

    render(gl) {

    }

    destroy(gl) {

    }

    render2D(context) {

    }

    get parentWidth() {
      return this.parent ? this.parent.width : 1;
    }

    get parentHeight() {
      return this.parent ? this.parent.height : 1;
    }

  };

})();
