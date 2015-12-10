/// <reference path="../math/Vector4.ts" />
/// <reference path="./Color.ts" />

module ne.graphics {

  export class ColorBase extends math.Vector4 {

    get [0]() {
      return this._data[0];
    }

    set [0](value) {
      this._data[0] = Math.min(255, Math.max(0, value));
    }

    get [1]() {
      return this._data[1];
    }

    set [1](value) {
      this._data[1] = Math.min(255, Math.max(0, value));
    }

    get [2]() {
      return this._data[2];
    }

    set [2](value) {
      this._data[2] = Math.min(255, Math.max(0, value));
    }

    get [3]() {
      return this._data[3];
    }

    set [3](value) {
      this._data[3] = Math.min(255, Math.max(0, value));
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

    get alpha() {
      return this.a;
    }

    set alpha(value) {
      this.a = value;
    }

    get hue():number {
      return this.toHsl()[0];
    }

    set hue(value) {
      var hsla = this.toHsla();
      hsla[0] = value;
      var c = Color.fromHsla(hsla);
      this.set(c.red, c.green, c.blue, c.alpha);
    }

    get saturation():number {
      return this.toHsl()[1];
    }

    set saturation(value) {
      var hsla = this.toHsla();
      hsla[1] = value;
      var c = Color.fromHsla(hsla);
      this.set(c.red, c.green, c.blue, c.alpha);
    }

    get luminance():number {
      return this.toHsl()[2];
    }

    set luminance(value) {
      var hsla = this.toHsla();
      hsla[2] = value;
      var c = Color.fromHsla(hsla);
      this.set(c.red, c.green, c.blue, c.alpha);
    }


    toHsla() {
      var r = this.red / 255, g = this.green / 255, b = this.blue / 255;
      var max = Math.max(r, g, b), min = Math.min(r, g, b);
      var h, s, l = (max + min) / 2;
      if (max == min) {
          h = s = 0; // achromatic
      }else{
          var d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch(max){
              case r: h = (g - b) / d + (g < b ? 6 : 0); break;
              case g: h = (b - r) / d + 2; break;
              case b: h = (r - g) / d + 4; break;
          }
          h /= 6;
      }

      return [h, s, l, this.alpha];
    }

    toHsl() {
      var r = this.red / 255, g = this.green / 255, b = this.blue / 255;
      var max = Math.max(r, g, b), min = Math.min(r, g, b);
      var h, s, l = (max + min) / 2;

      if(max == min){
          h = s = 0; // achromatic
      }else{
          var d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch(max){
              case r: h = (g - b) / d + (g < b ? 6 : 0); break;
              case g: h = (b - r) / d + 2; break;
              case b: h = (r - g) / d + 4; break;
          }
          h /= 6;
      }

      return [h, s, l];
    }

  }

}
