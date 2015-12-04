ne.SceneManager = (function () {


  return class SceneManager extends ne.EventManager {

    constructor() {
      super();
      this._sceneStack = [null];
      this._lastScene = null;
    }

    get scene() {
      return this._sceneStack[this._sceneStack.length];
    }

    goto(scene) {
      this._sceneStack = [];
      this.call(scene);
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

    updateScene(delta) {
      this.scene.act(delta);
    }

  }

})();
