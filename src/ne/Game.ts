module ne {

  export class Game {

    private _updateBind : (delta: number) => any;

    start(scene: scene.SceneClass) {
      this._updateBind = this.update.bind(this);
    }

    update(delta: number) {

    }

  }

}
