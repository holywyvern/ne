/// <reference path="./Matrix2.ts" />

module ne.math {

  export class Matrix3 extends Matrix2 {

    get['4']() {
      return this._data[4];
    }

    set['4'](value) {
      this._data[4] = value;
    }

    get['5']() {
      return this._data[5];
    }

    set['5'](value) {
      this._data[5] = value;
    }

    get['6']() {
      return this._data[6];
    }

    set['6'](value) {
      this._data[6] = value;
    }

    get['7']() {
      return this._data[7];
    }

    set['7'](value) {
      this._data[7] = value;
    }

    mul(other:Matrix3) {
      var a = this.data;
      var b = other.data;
      var a00 = a[0], a01 = a[1], a02 = a[2];
      var a10 = a[3], a11 = a[4], a12 = a[5];
      var a20 = a[6], a21 = a[7], a22 = a[8];
      var b00 = b[0], b01 = b[1], b02 = b[2];
      var b10 = b[3], b11 = b[4], b12 = b[5];
      var b20 = b[6], b21 = b[7], b22 = b[8];
      a[0] = a00 * b00 + a01 * b10 + a02 * b20;
      a[1] = a00 * b01 + a01 * b11 + a02 * b21;
      a[2] = a00 * b02 + a01 * b12 + a02 * b22;
      a[3] = a10 * b00 + a11 * b10 + a12 * b20;
      a[4] = a10 * b01 + a11 * b11 + a12 * b21;
      a[5] = a10 * b02 + a11 * b12 + a12 * b22;
      a[6] = a20 * b00 + a21 * b10 + a22 * b20;
      a[7] = a20 * b01 + a21 * b11 + a22 * b21;
      a[8] = a20 * b02 + a21 * b12 + a22 * b22;
      return this;
    }

    translate(x:number, y:number) {
      return this.mul(Matrix3.translation(x, y));
    }

    rotate(angle:number) {
      return this.mul(Matrix3.rotation(angle));
    }

    scale(x:number, y:number) {
      return this.mul(Matrix3.scale(x, y));
    }

    static get IDENTITY() {
      var mat = new Matrix3();
      var data = mat.data;
      data[0] = data[4] = data[8] = 1;
      return mat;
    }

    static translation(x:number, y:number) {
      var mat = new Matrix3();
      var data = mat.data;
      data[0] = data[4] = data[8] = 1;
      data[6] = x;
      data[7] = y;
      return mat;
    }

    static rotation(angle:number) {
      var mat = new Matrix3();
      var data = mat.data;
      var c = Math.cos(angle);
      var s = Math.sin(angle);
      data[0] = data[4] = c;
      data[1] = -s;
      data[3] = s;
      data[8] = 1;
      return mat;
    }

    static scale(x:number, y:number) {
      var mat = new Matrix3();
      var data = mat.data;
      data[0] = x;
      data[4] = y;
      data[8] = 1;
      return mat;
    }

    static projection(w:number, h:number) {
      var mat = new Matrix3();
      var data = mat.data;
      data[0] = 2 / w;
      data[4] = -2 / h;
      data[6] = -1;
      data[7] = mat[8] = 1;
      return mat;
    }

  }

}
