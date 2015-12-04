ne.Game = (function () {


  return class Game extends ne.SceneManager {

    constructor(id, width, height) {
      super();
      this.initMembers(id, width, height);
      this.initEventHandlers();
    }

    initMembers(id, width, height) {
      this.createRenderer(width, height);
      this.appendRenderer(id);
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

    update(delta) {
      super.update(delta);
    }

    switchScene() {
      this.renderer.destroy(this._lastScene);
      this._lastScene = this.scene;
      var loader = new ne.Loader();
      this.prepareLoad(loader);
      this.scene.load();
    }

    prepareLoad(loader) {
      loader.done(() => this.afterLoad(loader));
    }

    endLoad() {

    }

    afterLoad(loader) {
      this.endLoad();
      this.scene.start(loader);
    }

  };

})();
