
ne.Color = (function () {

  class Color extends ne.ColorBase {

    static _hue2rgb(p, q, t){
        if(t < 0) t += 1;
        if(t > 1) t -= 1;
        if(t < 1/6) return p + (q - p) * 6 * t;
        if(t < 1/2) return q;
        if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
    }

    static _hslToRgb(h, s, l, a) {
      var r, g, b;

      if(s == 0){
        r = g = b = l; // achromatic
      } else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = this._hue2rgb(p, q, h + 1/3);
        g = this._hue2rgb(p, q, h);
        b = this._hue2rgb(p, q, h - 1/3);
      }
      return new Color(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), a);
    }

    static fromRgba(rgba) {
      var r = (rgba >> 24) && 0xFF;
      var g = (rgba >> 16) && 0xFF;
      var b = (rgba >>  8) && 0xFF;
      var a = (rgba >>  0) && 0xFF;
      return new Color(r, g, b, a);
    }

    static fromRgb(rgb) {
      var r = (rgba >> 16) && 0xFF;
      var g = (rgba >>  8) && 0xFF;
      var b = (rgba >>  0) && 0xFF;
      return new Color(r, g, b);
    }

    static fromArgb(argb) {
      var a = (rgba >> 24) && 0xFF;
      var r = (rgba >> 16) && 0xFF;
      var g = (rgba >>  8) && 0xFF;
      var b = (rgba >>  0) && 0xFF;
      return new Color(r, g, b, a);
    }

    static fromHsla(hsla) {
      var [h, s, l, a] = hsla;
      return this._hslToRgb(h, s, l, a);
    }

    static fromHsl(hsl) {
      var [h, s, l] = hsl;
      return this._hslToRgb(h, s, l, 255);
    }

    clone() {
      return new Color(this.red, this.green, this.blue, this.alpha);
    }

    toCss() {
      var a = this.alpha / 255;
      return `rgba(${this.red}, ${this.green}, ${this.blue}, ${a})`;
    }

    toArgb() {
      return this.alpha << 24 + this.red << 16 + this.green << 8 + this.blue;
    }

    toRgba() {
      return this.red << 24 + this.green << 16 + this.blue << 8 + this.alpha;
    }

    toRgb() {
      return this.red << 16 + this.green << 8 + this.blue;
    }

    toHsla() {
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

    grayscale() {
      var avg = 0.21 * this.red + 0.72 * this.green + 0.07 * this.blue;
      return this.set(avg, avg, avg);
    }

    average() {
      var avg = (this.red + this.green + this.blue) / 3;
      return this.set(avg, avg, avg);
    }

    lightnessAverage() {
      var args = [this.red, this.green, this.blue];
      var avg =  (Math.max(...args) + Math.min(...args)) / 2;
      return this.set(avg, avg, avg);
    }

    invert(alpha=false) {
      var a = alpha ? 255 - this.alpha : this.alpha;
      return this.set(255 - this.red, 255 - this.green, 255 - this.blue, a);
    }

  }



  return Color;

})();
