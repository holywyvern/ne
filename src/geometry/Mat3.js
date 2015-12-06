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

    }

  }

  return Mat3;

})();
