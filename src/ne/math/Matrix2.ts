module ne.math {

  export class Matrix2 {

    protected _data: Float32Array;

    constructor() {
      this._data = new Float32Array(this.width * this.height);
    }

    get width() {
      return 2;
    }

    get height() {
      return this.width;
    }

    get data() {
      return this._data;
    }

    get['0']() {
      return this._data[0];
    }

    set['0'](value) {
      this._data[0] = value;
    }

    get['1']() {
      return this._data[1];
    }

    set['1'](value) {
      this._data[1] = value;
    }

    get['2']() {
      return this._data[2];
    }

    set['2'](value) {
      this._data[2] = value;
    }

    get['3']() {
      return this._data[3];
    }

    set['3'](value) {
      this._data[3] = value;
    }

    at(x:number, y: number) {
      return this[x % this.width + Math.floor(y / this.width)];
    }

    set(x:number, y: number, value:number) {
      this[x % this.width + Math.floor(y / this.width)] = value;
    }

    copyFrom(mat:Matrix2) {
      var length = this.width * this.height;
      var a = this.data;
      var b = mat.data;
      for (var i = 0; i < length; ++i) {
        a[i] = b[i];
      }
      return this;
    }

    copyTo(mat:Matrix2) {
      return mat.copyFrom(this);
    }

    static get IDENTITY() {
      var mat = new Matrix2();
      mat[0] = mat[3] = 1;
      return mat;
    }

  }

}
