ne.WebGLRenderer = (function () {

  return class WebGLRenderer extends ne.Renderer {

    createContext() {
      this._gl = this.view.getContext('webgl');
      if (!this._gl) {
        this._gl = this.view.getContext('exerimental-webgl');
      }
      if (!this._gl) {
        throw "Your browser doesn't support webgl.";
      }
    }

    render(object) {
      object.render(this._gl);
    }

  };

})();
