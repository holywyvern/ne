module ne {

  export class Scene implements ne.utils.EventHandler {

    private _eventManager: utils.EventManager;

    constructor() {
      this.createEventManager();
    }

    createEventManager() {
      this._eventManager = new utils.EventManager(this);
    }

    defaultEvent(name: string, event: Event) {

    }

    get eventManager() {
      return this._eventManager;
    }

    load(loader: utils.Loader) {

    }

    start(loader : utils.CacheFinder) {

    }

  }

}
