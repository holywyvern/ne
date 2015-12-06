ne.SceneManager = (function () {


  return class SceneManager extends ne.EventManager {

    constructor() {
      super();
      this._sceneStack = [null];
      this._lastScene = null;
    }

    get scene() {
      return this._sceneStack[this._sceneStack.length - 1];
    }

    goto(scene) {
      this.clearSceneStack();
      this.call(scene);
    }

    clearSceneStack() {
      this._sceneStack = [null];
    }

    call(scene) {
      this._sceneStack.push(scene);
    }

    back() {
      this._sceneStack.pop();
    }

    update(delta) {
      if (this._lastScene !== this.scene) {
        this.switchScene();
        return;
      }
      this.updateScene(delta);
    }

    switchScene() {
      this.destroyScene(this._lastScene);
      this._lastScene = this.scene;
      var loader = new ne.Loader();
      this.prepareLoad(loader);
      this.scene.load(this, loader);
      loader.start();
    }

    destroyScene(scene) {
    }

    prepareLoad(loader) {
      loader.done(() => this.afterLoad(loader));
    }

    endLoad() {

    }

    afterLoad(loader) {
      this.endLoad();
      this.scene.start(this, loader);
    }

    updateScene(delta) {
      if (this.scene) {
          this.scene.act(delta);
      }
    }

  }

})();
