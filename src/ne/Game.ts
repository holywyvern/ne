module ne {

  export var WEBGL    = 1;
  export var CANVAS2D = 2;

  export interface GameOptions {
    mode: number;
    width: number;
    height: number;
  }

  export class LoadScene extends scene.Scene {

  }

  export class Game {

    private _updateBind   : (delta: number) => any;
    private _sceneManager : scene.SceneManager;
    private _render       : graphics.Render;

    constructor(options : GameOptions= { width: 640, height: 480, mode: ne.WEBGL }) {
      this._sceneManager = new ne.scene.SceneManager(LoadScene);
      this.createRender(options);
    }

    createRender(options : GameOptions) {
      if (options.mode === WEBGL) {
        this._render = new graphics.WebGLRender(options.width, options.height);
      } else {
        this._render = new graphics.Canvas2DRender(options.width, options.height);
      }
    }

    start(scene: scene.SceneClass) {
      this._updateBind = this.update.bind(this);
    }

    update(delta: number) {
      this._render.render(this._sceneManager.instance)
      this._sceneManager.update(delta);
    }

    get view() {
      return this._render.canvas;
    }

  }

}
