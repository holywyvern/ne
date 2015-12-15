 module ne.scene {

  export class Scene implements ne.utils.EventHandler {

    private _eventManager: utils.EventManager;
    private _manager     : SceneManager;
    private _container   : objects.DrawableContainer;

    constructor(manager: SceneManager) {
      this._eventManager = new utils.EventManager(this);
      this._manager      = manager;
      this._container    = new objects.Viewport(this.manager.game.rect);
      this.setup();
    }

    defaultEvent(name: string, event: Event) {

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

    render(gl: graphics.WebGLRender) {
      this._container.render(gl);
    }

  }

}
