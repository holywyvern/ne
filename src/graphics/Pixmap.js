
ne.Pixmap = (function () {

  return class Pixmal {

    constructor(width=1, height=1) {
      this._canvas  = document.createElement('canvas');
      this._context = this._canvas.getContext('2d');
    }

    static fromImage(img) {
      var pixmap = new Pixmap(img.width, img.height);
      pixmap._bltImage(img, 0, 0, img.width, img.height);
      return pixmap;
    }

    _bltImage(img, sx=0, sy=0, sw=undefined, sh=undefined, dx=0, dy=0, dw=undefined, dh=undefined) {
      if (typeof sw == 'undefined') sw = img.width;
      if (typeof sh == 'undefined') sh = img.height;
      if (typeof dw == 'undefined') dw = sw;
      if (typeof dh == 'undefined') dh = sh;
      this._context.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
      return this;
    }

    blt(bmp, sx=0, sy=0, sw=undefined, sh=undefined, dx=0, dy=0, dw=undefined, dh=undefined) {
      this._bltImage(bmp._canvas, sx, sy, sw, sh, dx, dy, dw, dh);
      return this;
    }

    drawLine(from, to, color) {

    }

  }

})();
