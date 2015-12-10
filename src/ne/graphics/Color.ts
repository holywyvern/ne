/// <reference path="./ColorBase.ts" />

module ne.graphics {

  export class Color extends ColorBase {

    constructor(r=0, g=0, b=0, a=255) {
      super(r, g, b, a);
    }

    private static _hue2rgb (p:number, q:number, t:number) {
        if(t < 0) t += 1;
        if(t > 1) t -= 1;
        if(t < 1/6) return p + (q - p) * 6 * t;
        if(t < 1/2) return q;
        if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
    }

    private static _hslToRgb(h:number, s:number, l:number, a:number) {
      var r, g, b;

      if (s == 0) {
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

    static fromRgba(rgba:number) {
      var r = (rgba >> 24) && 0xFF;
      var g = (rgba >> 16) && 0xFF;
      var b = (rgba >>  8) && 0xFF;
      var a = (rgba >>  0) && 0xFF;
      return new Color(r, g, b, a);
    }

    static fromRgb(rgb:number) {
      var r = (rgb >> 16) && 0xFF;
      var g = (rgb >>  8) && 0xFF;
      var b = (rgb >>  0) && 0xFF;
      return new Color(r, g, b);
    }

    static fromArgb(argb) {
       var a = (argb >> 24) && 0xFF;
       var r = (argb >> 16) && 0xFF;
       var g = (argb >>  8) && 0xFF;
       var b = (argb >>  0) && 0xFF;
       return new Color(r, g, b, a);
     }

     static fromHsla(hsla: number[]) {
       var [h, s, l, a] = hsla;
       return this._hslToRgb(h, s, l, a);
     }

     static fromHsl(hsl: number[]) {
       var [h, s, l] = hsl;
       return this._hslToRgb(h, s, l, 255);
     }

     clone() {
        return new Color(this.red, this.green, this.blue, this.alpha);
      }

      complement() {
         this.hue = (0.5 + this.hue) % 1;
         return this;
       }

       toCss() {
         var a = this.alpha / 255;
         return `rgba(${this.red}, ${this.green}, ${this.blue}, ${a})`;
       }

       toStyle(w:number, h:number, context:CanvasRenderingContext2D) {
         return this.toCss();
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

       static get WHITE() {
         return new Color(255, 255, 255);
       }

       static get BLACK() {
         return new Color();
       }

       static get RED() {
         return new Color(255, 0, 0);
       }

       static get GREEN() {
         return new Color(0, 128, 0);
       }

       static get BLUE() {
         return new Color(0, 0, 255);
       }

       static get YELLOW() {
         return new Color(255, 255, 0);
       }

       static get MAGENTA() {
         return new Color(255, 0, 255);
       }

       static get CYAN() {
         return new Color(0, 255, 255);
       }

       static get GRAY() {
         return new Color(128, 128, 128);
       }

       static get DARK_GRAY() {
         return new Color(169, 169, 169);
       }

       static get LIGHT_GRAY() {
         return new Color(211, 211, 211);
       }

       static get ORANGE() {
         return new Color(255, 165, 0);
       }

       static get BROWN() {
         return new Color(165, 42, 42);
       }

       static get LIME() {
         return new Color(0, 255, 0);
       }

       static get LIGHT_BLUE() {
         return new Color(173, 216, 230);
       }

       static get PINK() {
         return new Color(255, 192, 203);
       }

       static get TRANSPARENT() {
         return new Color(0, 0, 0, 0);
       }

       static get RANDOM() {
         var r = Math.floor(Math.random() * 255);
         var g = Math.floor(Math.random() * 255);
         var b = Math.floor(Math.random() * 255);
         return new Color(r, g, b);
       }

  }

}
