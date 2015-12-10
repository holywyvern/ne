ne.Mat3 = (function () {

  class Mat3 extends ne.Mat2 {

    get width() {
      return 3;
    }

    get height() {
      return 3;
    }

    get ['4']() {
      return this.data[4];
    }

    get ['5']() {
      return this.data[5];
    }

    get ['6']() {
      return this.data[6];
    }

    get ['7']() {
      return this.data[7];
    }

    set ['4'](value) {
      this.data[4] = value;
    }

    set ['5'](value) {
      this.data[5] = value;
    }

    set ['6'](value) {
      this.data[6] = value;
    }

    set ['7'](value) {
      this.data[7] = value;
    }

    clone() {
      return this.copyTo(new Mat3());
    }

    static get IDENTITY() {
      var mat = new Mat3();
      var data = mat.data;
      data[0] = data[4] = data[8] = 1;
      return mat;
    }

    static translation(x, y) {
      var mat = new Mat3();
      var data = mat.data;
      data[0] = data[4] = data[8] = 1;
      data[6] = x;
      data[7] = y;
      return mat;
    }

    static rotation(angle) {
      var mat = new Mat3();
      var data = mat.data;
      var c = Math.cos(angle);
      var s = Math.sin(angle);
      data[0] = data[4] = c;
      data[1] = -s;
      data[3] = s;
      data[8] = 1;
      return mat;
    }

    static scale(x, y) {
      var mat = new Mat3();
      var data = mat.data;
      data[0] = x;
      data[4] = y;
      data[8] = 1;
      return mat;
    }

    static projection(w, h) {
      var mat = new Mat3();
      var data = mat.data;
      data[0] = 2 / w;
      data[4] = -2 / h;
      data[6] = -1;
      data[7] = mat[8] = 1;
      return mat;
    }

    multiply(other) {
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

    translate(x, y) {
      return this.multiply(Mat3.translation(x, y));
    }

    rotate (angle) {
      return this.multiply(Mat3.rotation(angle));
    }

    scale(x, y) {
      return this.multiply(Mat3.scale(x, y));
    }



  }

  return Mat3;

})();
