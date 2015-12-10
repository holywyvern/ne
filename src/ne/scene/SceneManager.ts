module ne.scene {

  export class SceneManager {

    private _sceneStack : Scene[];

    constructor() {
      this._sceneStack = [null];
    }

    get scene() {
      return this._sceneStack[this._sceneStack.length - 1];
    }

  }

}
