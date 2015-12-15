/// <reference path="./Matrix3.ts" />

module ne.math {

  export class Matrix4 extends Matrix3 {

    get width() {
      return 4;
    }

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

    static camera(cam: ne.scene.Camera) {
        var mat = new Matrix4();
        return mat.camera(cam);
    }

    camera(cam: ne.scene.Camera) {
      return this.lookAt(cam.origin, cam.destination, cam.up);
    }

    lookAt(from: Vector3, to: Vector3, up: Vector3) {
      var pos = from.clone();
      var zAxis = pos.sub(to).normalize();
      var xAxis = up.clone().cross(zAxis);
      var yAxis = zAxis.clone().cross(xAxis);
      var d = this.data, dx = xAxis.data, dy = yAxis.data, dz = zAxis.data, pd = pos.data;
      d[0]  = dx[0]; d[1]  = dx[1]; d[2]  = dx[2]; d[3]  = 0;
      d[4]  = dy[0]; d[5]  = dy[1]; d[6]  = dy[2]; d[7]  = 0;
      d[8]  = dz[0]; d[9]  = dz[1]; d[10] = dz[2]; d[11] = 0;
      d[12] = pd[0]; d[13] = pd[1]; d[14] = pd[2]; d[15] = 0;
      return this;
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

    inverse() {
      var m = this.data;
      var m00 = m[0], m01 = m[1], m02 = m[2], m03 = m[3];
      var m10 = m[4], m11 = m[5], m12 = m[6], m13 = m[7];
      var m20 = m[8], m21 = m[9], m22 = m[10], m23 = m[11];
      var m30 = m[12], m31 = m[13], m32 = m[14], m33 = m[15];
      var t0  = m22 * m33, t1  = m32 * m23, t2  = m12 * m33, t3  = m32 * m13;
      var t4  = m12 * m23, t5  = m22 * m13, t6  = m02 * m33, t7  = m32 * m03;
      var t8  = m02 * m23, t9  = m22 * m03, t10 = m02 * m13, t11 = m12 * m03;
      var t12 = m20 * m31, t13 = m30 * m21, t14 = m10 * m31, t15 = m30 * m11;
      var t16 = m10 * m21, t17 = m20 * m11, t18 = m00 * m31, t19 = m30 * m01;
      var t20 = m00 * m21, t21 = m20 * m01, t22 = m00 * m11, t23 = m10 * m01;

      var t0 = (t0 * m11 + t3 * m21 + t4 * m31) -
          (t1 * m11 + t2 * m21 + t5 * m31);
      var t1 = (t1 * m01 + t6 * m21 + t9 * m31) -
          (t0 * m01 + t7 * m21 + t8 * m31);
      var t2 = (t2 * m01 + t7 * m11 + t10 * m31) -
          (t3 * m01 + t6 * m11 + t11 * m31);
      var t3 = (t5 * m01 + t8 * m11 + t11 * m21) -
          (t4 * m01 + t9 * m11 + t10 * m21);

      var d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

      m[0]  = d * t0; m[1]  = d * t1; m[2]  = d * t2; m[3]  = d * t3;
      m[4]  = d * ((t1 * m10 + t2 * m20 + t5 * m30) - (t0 * m10 + t3 * m20 + t4 * m30));
      m[5]  = d * ((t0 * m00 + t7 * m20 + t8 * m30) - (t1 * m00 + t6 * m20 + t9 * m30));
      m[6]  = d * ((t3 * m00 + t6 * m10 + t11 * m30) - (t2 * m00 + t7 * m10 + t10 * m30));
      m[7]  = d * ((t4 * m00 + t9 * m10 + t10 * m20) - (t5 * m00 + t8 * m10 + t11 * m20));
      m[8]  = d * ((t12 * m13 + t15 * m23 + t16 * m33) - (t13 * m13 + t14 * m23 + t17 * m33));
      m[9]  = d * ((t13 * m03 + t18 * m23 + t21 * m33) - (t12 * m03 + t19 * m23 + t20 * m33));
      m[10] = d * ((t14 * m03 + t19 * m13 + t22 * m33) - (t15 * m03 + t18 * m13 + t23 * m33));
      m[11] = d * ((t17 * m03 + t20 * m13 + t23 * m23) - (t16 * m03 + t21 * m13 + t22 * m23));
      m[12] = d * ((t14 * m22 + t17 * m32 + t13 * m12) - (t16 * m32 + t12 * m12 + t15 * m22));
      m[13] = d * ((t20 * m32 + t12 * m02 + t19 * m22) - (t18 * m22 + t21 * m32 + t13 * m02));
      m[14] = d * ((t18 * m12 + t23 * m32 + t15 * m02) - (t22 * m32 + t14 * m02 + t19 * m12));
      m[15] = d * ((t22 * m22 + t16 * m02 + t21 * m12) - (t20 * m12 + t23 * m22 + t17 * m02));
      return this;
    }

  }

}
