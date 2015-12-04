
ne.Pixmap = (function () {

  return class Pixmap {

    constructor(width=1, height=1) {
      this._canvas  = document.createElement('canvas');
      this._canvas.width = width;
      this._canvas.height = height;
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

    generateTexture(gl) {
      return ne.tools.gl.textureFromCanvas(gl, this._canvas);
    }

    get width() {
      return this._canvas.width;
    }

    get height() {
      return this._canvas.height;
    }

    get rect() {
      return new ne.Rect(0, 0, this.width, this.height);
    }

    strokeRect(rect, style, width=1) {
      var state = this._context.save();
      this._context.strokeStyle = style.toStyle();
      this._context.lineWidth   = width;
      this._context.strokeRect(rect.x, rect.y, rect.width, rect.height);
      this._context.restore(state);
    }

    fillRect(rect, style) {
      var state = this._context.save();
      this._context.fillStyle = style.toStyle();
      this._context.fillRect(rect.x, rect.y, rect.width, rect.height);
      this._context.restore(state);
    }

    clearRect(rect) {
      this._context.clearRect(rect.x, rect.y, rect.width, rect.height);
    }

    clear() {
      this._context.clearRect(0, 0, this.width, this.height);
    }

  }

})();
