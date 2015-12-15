/// <reference path="./Drawable.ts" />

module ne.graphics {

  export class DrawableContainer extends Drawable implements RenderObject  {

    private _changed  : boolean;
    private _children : Array<Drawable>;

    constructor() {
      super();
      this._changed  = false;
      this._children = [];
    }

    notifyChanges() {
      this._changed = true;
    }

    render(gl: WebGLRenderingContext) {
      this._checkZIndex();
      this._renderChildren(gl);
    }

    protected _checkZIndex() {
      if (this._changed) {
        this._changed = false;
        this._children.sort((a, b) => a.z - b.z);
      }
    }

    protected _renderChildren(gl: WebGLRenderingContext) {
      for (var c of this._children) {
        c.render(gl);
      }
    }

    remove(child: Drawable) {
      var idx = this._children.indexOf(child);
      if (idx !== -1) {
        this._children.splice(idx, 1);
        child.parent = null;
      }
    }

    add(child: Drawable) {
      var idx = this._children.indexOf(child);
      if (idx === -1) {
        this._children.push(child);
        this.notifyChanges();
      }
    }

    contains(child : Drawable) {
      return this._children.indexOf(child) !== -1;
    }

  }

}
