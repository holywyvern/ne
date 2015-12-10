module ne.scene {

  class Camera {

    private _position : math.Vector3;
    private _angle    : math.Vector3;

    constructor() {
      this._position = new math.Vector3();
      this._angle    = new math.Vector3();
    }

    get position() {
      return this._position;
    }

    get angle() {
      return this._angle;
    }

  }

}
