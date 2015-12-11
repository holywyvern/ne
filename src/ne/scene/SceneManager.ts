module ne.scene {

  export interface SceneClass {
    new (manager : SceneManager): Scene;
  }

  export class SceneManager {

    private _sceneStack : SceneClass[];
    private _lastScene  : SceneClass;
    private _instance   : Scene;
    private _loadScene  : Scene;
    private _isReady    : boolean;

    constructor(loadScene : SceneClass = null) {
      this._sceneStack = [null];
      this._lastScene  = null;
      this._instance   = null;
      this.setupLoadScene(loadScene);
    }

    setupLoadScene(scene: SceneClass) {
      this._isReady = false;
      var loader = new utils.Loader();
      this._loadScene  = new (scene || Scene)(this);
      this._instance.load(loader);
      loader.done(() => this._isReady = true );
      loader.start();
    }

    get ready() {
      return this._isReady;
    }

    get scene() {
      return this._sceneStack[this._sceneStack.length - 1];
    }

    get instance() {
      return this._instance;
    }

    goto(scene: SceneClass) {
      this.clear();
      this.call(scene);
    }

    call(scene : SceneClass) {
      this._sceneStack.push(scene);
    }

    back() {

    }

    clear() {
      this._sceneStack = [null];
    }

    update(delta: number) {
      if (!this.ready) return;
      var scene = this.scene;
      if (this._lastScene !== scene) {
        this._swapScene(scene);
        return;
      }
      this._updateInstance(delta);
    }

    private _swapScene(scene: SceneClass) {
      this._lastScene = scene;
      this._terminate();
      this._instance = new scene(this);
      var loader = new utils.Loader();
      loader.done(this._afterLoad.bind(this));
      this._instance.load(loader);
      loader.start();
      this._loadScene.start(loader.cache);
    }

    private _afterLoad(loader : utils.Loader) {
      this._loadScene.destroy();
      this._instance.start(loader.cache);
    }

    private _terminate() {
      if (this._instance) {
        this._instance.destroy();
      }
    }

    private _updateInstance(delta: number) {
        if (this._instance) {
          this._instance.update(delta);
        } else {
          this._loadScene.update(delta);
        }
    }

  }

}
