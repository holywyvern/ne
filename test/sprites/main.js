"use strict";

class TestScene extends ne.Scene {

  load(loader) {
    loader.pixmap('img/sprite.png');
  }

  start(cache) {
    var texture = new ne.Texture(cache.pixmap('img/sprite.png'));
    for (var i= 0; i < 100; ++i) {
      let sprite = new ne.Sprite();
      sprite.texture = texture;
      this.container.add(sprite);
    }
  }

  update(delta) {
    super.update(delta);
  }

}

var game = new ne.Game({});
game.attach('game');
game.start(TestScene);
