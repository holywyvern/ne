/// <reference path="./Vector3.ts" />

module ne.math {

  export class Vector4 extends Vector3 {

    constructor(x=0, y=0, z=0, w=0) {
      super(x, y, z);
      this[3] = w;
    }

    get length() {
      return 4;
    }

    clone():Vector4 {
      var vec = new Vector4();
      return vec.copyFrom(this);
    }

    get [3]() {
      return this._data[3];
    }

    set [3](value) {
      this._data[3] = value;
    }

    set (x, y, z=0, w=0) {
      super.set(x, y, z);
      var data = this.data;
      data[2] = z;
      data[3] = w;
    }

  }

}
