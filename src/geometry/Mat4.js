ne.Mat4 = (function () {

  class Mat4 extends ne.Mat3 {

    get width() {
      return 4;
    }

    get height() {
      return 4;
    }

    get ['8']() {
      return this.data[8];
    }

    get ['9']() {
      return this.data[9];
    }

    get ['10']() {
      return this.data[10];
    }

    get ['11']() {
      return this.data[11];
    }

    get ['12']() {
      return this.data[12];
    }

    get ['13']() {
      return this.data[13];
    }

    get ['14']() {
      return this.data[14];
    }

    get ['15']() {
      return this.data[15];
    }

    set ['8'](value) {
      this.data[8] = value;
    }

    set ['9'](value) {
      this.data[9] = value;
    }

    set ['10'](value) {
      this.data[10] = value;
    }

    set ['11'](value) {
      this.data[11] = value;
    }

    set ['12'](value) {
      this.data[12] = value;
    }

    set ['13'](value) {
      this.data[13] = value;
    }

    set ['14'](value) {
      this.data[14] = value;
    }

    set ['15'](value) {
      this.data[15] = value;
    }

    clone() {
      return this.copyTo(new Mat4());
    }

    static get IDENTITY() {
      var mat = new Mat4();
      mat.set(0, 0, 1);
      mat.set(1, 1, 1);
      mat.set(2, 2, 1);
      mat.set(3, 3, 1);
      return mat;
    }

  }

  return Mat4;

})();
