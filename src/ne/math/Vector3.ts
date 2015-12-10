/// <reference path="./Vector2.ts" />

module ne.math {

  export class Vector3 extends Vector2 {

    constructor(x=0, y=0, z=0) {
      super(x, y);
      this[2] = z;
    }

    get length() {
      return 3;
    }

    clone():Vector3 {
      var vec = new Vector3();
      return vec.copyFrom(this);
    }

    get [2]() {
      return this._data[2];
    }

    set [2](value) {
      this._data[2] = value;
    }


    set (x, y, z=0) {
      super.set(x, y);
      var data = this.data;
      data[2] = z;
    }

  }

}
