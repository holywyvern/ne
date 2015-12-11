module ne.scene {

  export class Camera {

    private _origin      : math.Vector3;
    private _destination : math.Vector3;
    private _up          : math.Vector3;
    private _view        : math.Matrix4;

    constructor() {
      this._origin      = new math.Vector3();
      this._destination = new math.Vector3();
      this._up          = new math.Vector3();
      this._view        = new math.Matrix4();
    }

    get origin() {
      return this._origin;
    }

    get destination() {
      return this._destination;
    }

    get up() {
      return this._up;
    }

    get view() {
      return this._view.camera(this);
    }

  }

}
