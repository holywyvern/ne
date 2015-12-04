ne.Game = (function () {


  return class Game extends ne.SceneManager {

    constructor(id, width, height) {
      super();
      this.initMembers(id, width, height);
      this.initEventHandlers();
      this.processFrame();
    }

    initMembers(id, width, height) {
      this.createRenderer(width, height);
      this.appendRenderer(id);
      this._time = Date.now();
    }

    initEventHandlers() {
      window.addEventListener('resize', (evt) => this.fire('resize', evt));
      window.addEventListener('unload', (evt) => this.fire('unload', evt));
      window.addEventListener('beforeunload', (evt) => this.fire('beforeunload', evt));
    }

    createRenderer(width, height) {
      this._renderer = new ne.WebGLRenderer(width, height);
    }

    appendRenderer(id) {
      var e = document.getElementById(id);
      e.appendChild(this._renderer.view);
    }

    render() {
      if (this.scene) {
        this._renderer.render(this.scene);
      }
    }

    processFrame() {
      this.update(this.calculateDelta());
      this.render();
      window.requestAnimationFrame(this.processFrame.bind(this));
    }

    calculateDelta() {
      var t = Date.now();
      var delta = t - this._time;
      this._time = t;
      return delta;
    }

    destroyScene(scene) {
      if (scene) {
        this._renderer.destroy(scene);
      }
    }

    get width() {
      return this._renderer.width;
    }

    get height() {
      return this._renderer.height;
    }

    resize(width, height) {
      this._renderer.resize(width, height);
    }

  };

})();
