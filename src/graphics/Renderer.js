ne.Renderer = (function () {

  return class Renderer {

    constructor() {
      this.initMembers();
    }

    initMembers() {
      this.createCanvas();
      this.createContext();
    }

    createCanvas() {
      this._canvas = document.createElement('canvas');
    }

    createContext() {

    }

    render(object) {
    }

    get view() {
      return this._canvas;
    }

  };

})();
