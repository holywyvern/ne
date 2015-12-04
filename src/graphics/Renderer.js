ne.Renderer = (function () {

  return class Renderer {

    constructor(width, height) {
      this.initMembers(width, height);
    }

    initMembers(width, height) {
      this.createCanvas(width, height);
      this.createContext();
    }

    createCanvas(width, height) {
      this._canvas = document.createElement('canvas');
      this._canvas.width = width;
      this._canvas.height = height;
    }

    createContext() {

    }

    render(object) {
    }

    get view() {
      return this._canvas;
    }

    get width() {
      return this._canvas.width;
    }

    get height() {
      return this._canvas.height;
    }

    destroy(object) {
    }

  };

})();
