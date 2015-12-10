/// <reference path="./vectorFields.ts" />
/// <reference path="./Vector.ts" />

module ne.math {

  export class Vector2 extends Vector {

    constructor(x=0, y=0) {
      super(x, y);
    }

    clone():Vector2 {
      var vec = new Vector2();
      return vec.copyFrom(this);
    }

    copyFrom(vec:Vector2) {
      var length = this.length;
      var a = this.data;
      var b = vec.data;
      for (var i = 0; i < length; ++i) {
        a[i] = b[i];
      }
      return this;
    }

    copyTo(vec:Vector2) {
      return vec.copyFrom(this);
    }

    add(vec) {
      var length = this.length;
      var a = this.data;
      var b = vec.data;
      for (var i = 0; i < length; ++i) {
        a[i] += b[i];
      }
      return this;
    }

    sub(vec) {
      var length = this.length;
      var a = this.data;
      var b = vec.data;
      for (var i = 0; i < length; ++i) {
        a[i] -= b[i];
      }
      return this;
    }

    mul(vec) {
      var length = this.length;
      var a = this.data;
      var b = vec.data;
      for (var i = 0; i < length; ++i) {
        a[i] *= b[i];
      }
      return this;
    }

    div(vec) {
      var length = this.length;
      var a = this.data;
      var b = vec.data;
      for (var i = 0; i < length; ++i) {
        a[i] /= b[i];
      }
      return this;
    }

    mod(vec) {
      var length = this.length;
      var a = this.data;
      var b = vec.data;
      for (var i = 0; i < length; ++i) {
        a[i] %= b[i];
      }
      return this;
    }

    cross(vec) {
      var data = this.data;
      var x = data[1] * vec[2] - data[2] * vec[1];
      var y = data[2] * vec[0] - data[0] * vec[2];
      var z = data[0] * vec[1] - data[1] * vec[0];
      data[0] = x;
      data[1] = y;
      data[2] = z;
      return this;
    }

    set (x, y) {
      var data = this.data;
      data[0] = x;
      data[1] = y;
    }

  }
  vectorFields(Vector2.prototype, 's', 't');
  vectorFields(Vector2.prototype, 'u', 'v');
  vectorFields(Vector2.prototype, 'x', 'y', 'z', 'w');
  vectorFields(Vector2.prototype, 'r', 'g', 'b', 'a');

}
