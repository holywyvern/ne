/// <reference path="./scene/Scene.ts" />

module ne {

  export var WEBGL    = 1;
  export var CANVAS2D = 2;

  export interface GameOptions {
    mode?: number;
    width?: number;
    height?: number;
  }

  export class LoadScene extends scene.Scene {

  }

  export class Game {

    private _updateBind   : (delta: number) => any;
    private _sceneManager : scene.SceneManager;
    private _render       : graphics.Render;
    private _time         : number;

    constructor({ width: width = 480, height: height = 320,
                  mode: mode = ne.WEBGL,
                  loadScene: loadScene = LoadScene }) {
      this._sceneManager = new ne.scene.SceneManager(loadScene);
      this.createRender({ width, height, mode });
    }

    createRender(options : GameOptions) {
      if (options.mode === WEBGL) {
        this._render = new graphics.WebGLRender(options.width, options.height);
      } else {
        this._render = new graphics.Canvas2DRender(options.width, options.height);
      }
    }

    start(scene: scene.SceneClass) {
      this._time = performance.now();
      this._updateBind = this.update.bind(this);
      this._sceneManager.goto(scene);
      requestAnimationFrame(this._updateBind);
    }

    update(timestamp: number) {
      var delta = timestamp - this._time;
      this._render.render(this._sceneManager.instance)
      this._sceneManager.update(delta);
      this._time = timestamp;
      requestAnimationFrame(this._updateBind);
    }

    get view() {
      return this._render.canvas;
    }

  }

}
