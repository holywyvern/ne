module ne.graphics {

  export class Render {

    private _canvas : HTMLCanvasElement;

    constructor (width: number, height: number) {
      this._canvas = document.createElement('canvas');
      this._canvas.width  = width;
      this._canvas.height = height;
    }

    get canvas() {
      return this._canvas;
    }

    get width() {
      return this._canvas.width;
    }

    get height() {
      return this._canvas.height;
    }

    resize(width: number, height: number) {
      this._canvas.width = width;
      this._canvas.height = height;
    }

    render(object: RenderObject) {

    }

  }

}
