 module ne.scene {

  export class Scene implements ne.utils.EventHandler {

    private _eventManager: utils.EventManager;
    private _manager     : SceneManager;

    constructor(manager: SceneManager) {
      this._eventManager = new utils.EventManager(this);
      this._manager = manager;
    }

    defaultEvent(name: string, event: Event) {

    }

    get manager() {
      return this._manager;
    }

    get events() {
      return this._eventManager;
    }

    load(loader: utils.Loader) {

    }

    start(loader : utils.CacheFinder) {

    }

    destroy() {

    }

    update(delta: number) {

    }

  }

}
