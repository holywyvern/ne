module ne.graphics {

  export class Tone extends math.Vector4 {

    get [0]() {
      return this._data[0];
    }

    set [0](value) {
      this._data[0] = Math.min(255, Math.max(-255, value));
    }

    get [1]() {
      return this._data[1];
    }

    set [1](value) {
      this._data[1] = Math.min(255, Math.max(-255, value));
    }

    get [2]() {
      return this._data[2];
    }

    set [2](value) {
      this._data[2] = Math.min(255, Math.max(-255, value));
    }

    get [3]() {
      return this._data[3];
    }

    get red() {
      return this.r;
    }

    set red(value) {
      this.r = value;
    }

    get green() {
      return this.g;
    }

    set green(value) {
      this.g = value;
    }

    get blue() {
      return this.b;
    }

    set blue(value) {
      this.b = value;
    }

    get gray() {
      return this.a;
    }

    set gray(value) {
      this.a = value;
    }

    get grey() {
      return this.a;
    }

    set grey(value) {
      this.a = value;
    }

    set [3](value) {
      this._data[3] = Math.min(255, Math.max(0, value));
    }

    static get RANDOM() {
      var red   = Math.floor(Math.random() * 512 - 255);
      var green = Math.floor(Math.random() * 512 - 255);
      var blue  = Math.floor(Math.random() * 512 - 255);
      var gray  = Math.floor(Math.random() * 256);
      return new Tone(red, green, blue, gray);
    }

  }

}
