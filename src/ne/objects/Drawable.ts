module ne.objects {

  export class Drawable implements graphics.RenderObject {

    public visible  : boolean;
    private _z      : number;
    private _parent : DrawableContainer;

    constructor() {
      this._z = 0;
      this._parent = null;
    }

    get z() {
      return this._z;
    }

    set z(value) {
      if (value !== this._z) {
        this._z = value;
        if (this._parent) {
          this._parent.notifyChanges();
        }
      }
      this._z = value;
    }

    get parent() {
      return this._parent;
    }

    set parent(value) {
      if (value !== this._parent) {
        if (this._parent) {
          this._parent.remove(this);
          this._parent = null;
        }
        if (value) {
          value.add(this);
        }
        this._parent = value;
      }
    }

    render(render: graphics.WebGLRender) {

    }

  }

}
