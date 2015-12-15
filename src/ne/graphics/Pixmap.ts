module ne.graphics {

  export class Pixmap {

    private _canvas:  HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;

    font: Font;

    constructor(width: number, height: number) {
      this._canvas = document.createElement('canvas');
      this._canvas.width = width;
      this._canvas.height = height;
      this._context = this._canvas.getContext('2d');
    }

    static fromImage(img: HTMLImageElement) {
      var px = new Pixmap(img.width, img.height);
      px.context.drawImage(img, 0, 0);
      return px;
    }

    get canvas() {
      return this._canvas;
    }

    get context() {
      return this._context;
    }

    get width() {
      return this._canvas.width;
    }

    get height() {
      return this._canvas.height;
    }

    get rect() {
      return new Rect(0, 0, this.width, this.height);
    }

  }

}
