/// <reference path="../math/Vector4.ts" />

module ne.graphics {

  export class Rect extends math.Vector4 {

    get z() {
      return this[3];
    }

    set z(value) {
      this[3] = value;
    }

    get w() {
      return this[2];
    }

    set w(value) {
      this[2] = value;
    }

    get h() {
      return this[3];
    }

    set h(value) {
      this[3] = value;
    }

    get width() {
      return this.w;
    }

    set width(value) {
      this.w = value;
    }

    get height() {
      return this.h;
    }

    set height(value) {
      this.h = value;
    }

    clone() {
      return new Rect(this.x, this.y, this.w, this.h);
    }

  }

  math.vectorFields(Rect.prototype, 'x', 'y', 'w', 'h');

}
