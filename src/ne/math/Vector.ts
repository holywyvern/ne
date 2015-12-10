module ne.math {

  export class Vector {

    protected _data: Float32Array;

    constructor(x, y) {
      this._data = new Float32Array(this.length);
      this[0] = x;
      this[1] = y;
    }


        get length() {
          return 2;
        }

        get data() {
          return this._data;
        }

        get [0]():number {
          return this._data[0];
        }

        set [0](value:number) {
          this._data[0] = value;
        }

        get [1]():number {
          return this._data[1];
        }

        set [1](value:number) {
          this._data[1] = value;
        }

        get [2]():number {
          return 0;
        }

        set [2](value:number) {

        }

        get [3]():number {
          return 0;
        }

        set [3](value:number) {

        }

        get x():number {
          return this[0];
        }

        set x(value:number) {
          this[0] = value;
        }

        get r():number {
          return this[0];
        }

        set r(value:number) {
          this[0] = value;
        }

        get y():number {
          return this[1];
        }

        set y(value:number) {
          this[1] = value;
        }

        get g():number {
          return this[1];
        }

        set g(value:number) {
          this[1] = value;
        }

        get z():number {
          return this[2];
        }

        set z(value:number) {
          this[2] = value;
        }

        get b():number {
          return this[2];
        }

        set b(value:number) {
          this[2] = value;
        }

        get w():number {
          return this[3];
        }

        set w(value:number) {
          this[3] = value;
        }

        get a():number {
          return this[3];
        }

        set a(value:number) {
          this[3] = value;
        }

        get s():number {
          return this[0];
        }

        set s(value:number) {
          this[0] = value;
        }

        get u():number {
          return this[0];
        }

        set u(value:number) {
          this[0] = value;
        }

        get t():number {
          return this[1];
        }

        set t(value:number) {
          this[1] = value;
        }

        get v():number {
          return this[1];
        }

        set v(value:number) {
          this[1] = value;
        }

  }

}
