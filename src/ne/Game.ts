/// <reference path="./scene/LoadScene.ts" />
/// <reference path="./Mode.ts" />

module ne {

  export class Game {

    private _updateBind   : (delta: number) => any;
    private _sceneManager : scene.SceneManager;
    private _render       : graphics.Render;
    private _time         : number;

    constructor({ width: width = 480, height: height = 320,
                  mode: mode = ne.Mode.AUTO,
                  loadScene: loadScene = <scene.SceneClass>scene.LoadScene }) {
      this.createRender({ width, height, mode });
      this._sceneManager = new ne.scene.SceneManager(this, loadScene);    
    }

    createRender(options : GameOptions) {
      switch (options.mode) {
        case Mode.CANVAS2D:
          this._render = new graphics.Canvas2DRender(options);
          break;
        case Mode.WEBGL:
          this._render = new graphics.WebGLRender(options);
          break;
        case Mode.AUTO: default:
          this._autoDetectMode(options)
          break;
      }
    }

    private _autoDetectMode(options : GameOptions) {
      try {
        this._render = new graphics.WebGLRender(options);
      } catch (e) {
        this._render = new graphics.Canvas2DRender(options);
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

    get rect(): ne.graphics.Rect {
      return new ne.graphics.Rect(0, 0, this.width, this.height);
    }

    attach(id: string|HTMLElement) {
      var e = typeof id == 'string' ? document.getElementById(<string>id) : <HTMLElement>id;
      e.appendChild(this.view);
    }

    get width() {
      return this._render.width;
    }

    get height() {
      return this._render.height;
    }

  }

}
