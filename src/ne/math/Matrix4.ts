/// <reference path="./Matrix3.ts" />

module ne.math {

  export class Matrix4 extends Matrix3 {

    get['8']() {
      return this._data[8];
    }

    set['8'](value) {
      this._data[8] = value;
    }

    get['9']() {
      return this._data[9];
    }

    set['9'](value) {
      this._data[9] = value;
    }

    get['10']() {
      return this._data[10];
    }

    set['10'](value) {
      this._data[10] = value;
    }

    get['11']() {
      return this._data[11];
    }

    set['11'](value) {
      this._data[11] = value;
    }

    get['12']() {
      return this._data[12];
    }

    set['12'](value) {
      this._data[12] = value;
    }

    get['13']() {
      return this._data[13];
    }

    set['13'](value) {
      this._data[13] = value;
    }

    get['14']() {
      return this._data[14];
    }

    set['14'](value) {
      this._data[14] = value;
    }

    get['15']() {
      return this._data[15];
    }

    set['15'](value) {
      this._data[15] = value;
    }

    static get IDENTITY() {
      var mat = new Matrix4();
      var data = mat.data;
      data[0] = data[5] = data[10] = data[15] = 1;
      return mat;
    }

    static translation(x:number, y:number, z:number=0) {
      var mat = this.IDENTITY;
      var data = mat.data;
      data[12] = x;
      data[13] = y;
      data[14] = z;
      return mat;
    }

    static xRotation(angle:number) {
      var c    = Math.cos(angle);
      var s    = Math.sin(angle);
      var mat  = this.IDENTITY;
      var data = mat.data;
      data[5]  = data[10] = c;
      data[6]  = s;
      data[9]  = -s;
      return mat;
    };

    static yRotation(angle:number) {
      var c = Math.cos(angle);
      var s = Math.sin(angle);
      var mat  = this.IDENTITY;
      var data = mat.data;
      data[0]  = c;
      data[2]  = -s;
      data[8]  = s;
      data[10] = c;
      return mat;
    };

    static zRotation (angle:number) {
      var c = Math.cos(angle);
      var s = Math.sin(angle);
      var mat  = this.IDENTITY;
      var data = mat.data;
      data[0] = data[5] = c;
      data[1] = s;
      data[4] = -s;
      return mat;
    }

    static rotation(angle:number) {
      return this.zRotation(angle);
    }

    static scale(x:number, y:number, z=1) {
      var mat  = this.IDENTITY;
      var data = mat.data;
      data[0]  = x;
      data[5]  = y;
      data[10] = z;
      return mat;
    }

    translate(x:number, y:number, z=0) {
      return this.mul(Matrix4.translation(x, y, z));
    }

    rotate(angle:number) {
      return this.zRotate(angle);
    }

    xRotate(angle:number) {
      return this.mul(Matrix4.xRotation(angle));
    }

    yRotate(angle:number) {
      return this.mul(Matrix4.yRotation(angle));
    }

    zRotate(angle:number) {
      return this.mul(Matrix4.zRotation(angle));
    }

    scale(x:number, y:number, z=1) {
      return this.mul(Matrix4.scale(x, y, z));
    }

    mul(other:Matrix4) {
      var a = this.data;
      var b = other.data;
      var a00 =  a[0], a01 =  a[1], a02 =  a[2], a03 =  a[3],
          a10 =  a[4], a11 =  a[5], a12 =  a[6], a13 =  a[7],
          a20 =  a[8], a21 =  a[9], a22 = a[10], a23 = a[11],
          a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
      var b00 =  b[0], b01 =  b[1], b02 =  b[2], b03 =  b[3],
          b10 =  b[4], b11 =  b[5], b12 =  b[6], b13 =  b[7],
          b20 =  b[8], b21 =  b[9], b22 = b[10], b23 = b[11],
          b30 = b[12], b31 = b[13], b32 = b[14], b33 = b[15];

      a[0]  = a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30;
      a[1]  = a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31;
      a[2]  = a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32;
      a[3]  = a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33;
      a[4]  = a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30;
      a[5]  = a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31;
      a[6]  = a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32;
      a[7]  = a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33;
      a[8]  = a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30;
      a[9]  = a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31;
      a[10] = a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32;
      a[11] = a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33;
      a[12] = a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30;
      a[13] = a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31;
      a[14] = a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32;
      a[15] = a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33;
      return this;
    }

  }

}
