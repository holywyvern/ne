/// <reference path="./Drawable.ts" />

module ne.objects {

  export class DrawableContainer extends Drawable  {

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

    render(render: graphics.WebGLRender) {
      this._checkZIndex();
      this._renderChildren(render);
    }

    protected _checkZIndex() {
      if (this._changed) {
        this._changed = false;
        this._children.sort((a, b) => a.z - b.z);
      }
    }

    protected _renderChildren(render: graphics.WebGLRender) {
      for (var c of this._children) {
        c.render(render);
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
        child.parent = this;
      }
    }

    update(delta: number) {
      for (var c of this._children) {
        c.update(delta);
      }
    }

    contains(child : Drawable) {
      return this._children.indexOf(child) !== -1;
    }

    prepare(render: graphics.WebGLRender) {

    }

  }

}
