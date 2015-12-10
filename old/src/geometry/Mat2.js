ne.Mat2 = (function () {

  class Mat2 {

    constructor(cp=null) {
      this.createData();
      if (cp) {
        this.copyFrom(cp);
      }
    }

    createData() {
      this._data = new Float32Array(this.length);
    }

    get data() {
      return this._data;
    }

    get ['0']() {
      return this.data[0];
    }

    get ['1']() {
      return this.data[1];
    }

    get ['2']() {
      return this.data[2];
    }

    get ['3']() {
      return this._data[3];
    }

    set ['0'](value) {
      this._data[0] = value;
    }

    set ['1'](value) {
      this._data[1] = value;
    }

    set ['2'](value) {
      this._data[2] = value;
    }

    set ['3'](value) {
      this._data[3] = value;
    }

    get width() {
      return 2;
    }

    get height() {
      return 2;
    }

    get length() {
      return this.width * this.height;
    }

    get xsize() {
      return this.width;
    }

    get ysize() {
      return this.height;
    }

    get size() {
      return this.length;
    }

    at(i, j) {
      return this[ i % this.width + j * this.width ];
    }

    set(i, j, value) {
      this[ i % this.width + j * this.width ] = value;
    }


    clone() {
      return this.copyTo(new Mat2());
    }

    copyTo(mat) {
      var xs = Math.min(mat.width, this.width);
      var ys = Math.min(mat.height, this.height);
      for (var j = 0; j < ys; ++j) {
        for (var i = 0; i < xs; ++i) {
          mat.set(i, j, this.at(i, j));
        }
      }
      return mat;
     }

    copyFrom(mat) {
      var xs = Math.min(mat.width, this.width);
      var ys = Math.min(mat.height, this.height);
      for (var j = 0; j < ys; ++j) {
        for (var i = 0; i < xs; ++i) {
          this.set(i, j, mat.at(i, j));
        }
      }
      return this;
    }

    static get IDENTITY() {
      var mat = new Mat2();
      mat.set(0, 0, 1);
      mat.set(1, 1, 1);
      return mat;
    }

  }

  return Mat2;

})();
