 module ne.scene {

  export class Scene implements ne.utils.EventHandler {

    private _eventManager: utils.EventManager;
    private _manager     : SceneManager;
    private _container   : objects.DrawableContainer;
    private _bgColor     : graphics.Color;

    constructor(manager: SceneManager) {
      this._eventManager = new utils.EventManager(this);
      this._manager      = manager;
      this._container    = new objects.Viewport(this.manager.game.rect);
      this._bgColor = new graphics.Color();
      this.setup();
    }

    defaultEvent(name: string, event: Event) {

    }

    get bgColor() {
      return this._bgColor;
    }

    get manager() {
      return this._manager;
    }

    get game() {
      return this.manager.game;
    }

    get events() {
      return this._eventManager;
    }

    get container() {
      return this._container;
    }

    setup() {

    }

    load(loader: utils.Loader) {

    }

    start(cache : utils.CacheFinder) {

    }

    destroy() {

    }

    update(delta: number) {
      this.container.update(delta);
    }

    render(render: graphics.WebGLRender) {
      var gl = render.gl;
      var c = this.bgColor;
      gl.clearColor(c.r / 255, c.g / 255, c.b / 255, c.a / 255);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      this._container.render(render);
    }

  }

}
