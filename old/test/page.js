var game = new ne.Game('game-wrapper', 480, 320);

var scene = new ne.Scene();

scene.load = function (game, loader) {
  loader.loadPixmap('test', 'test/sprite.png');
  loader.loadPixmap('bg', 'test/background.png');
}

scene.start = function (game, loader) {
  this._background = new ne.Plane();
  this._background.texture = loader.texture('bg');
  //this._background.scale.set(0.5, 2);
  this._background.angle = 0;
  this.add(this._background);
  var whenDone = (sprite) => {
    var dx = randomInt(0, game.width - 64);
    var dy = randomInt(0, game.height - 64);
    sprite.x = dx + game.width;
    sprite.y = dy - game.height;
    var d = Math.sqrt(dx * dx + dy * dy);
    var gw = Math.sqrt(game.width * game.width + game.height * game.height);
    sprite.move(-dx, game.height + dy, 10000 + d * 10000 / gw ).done(whenDone);
  };
  var loopBg = (bg) => {
    bg.move(bg.x + 100, bg.y + 100, 1000).done(loopBg);
  };
  function randomInt(min, max) {
    return Math.floor( Math.random() * (max - min) + min);
  }
  this._sprites = [];
  this._motions = {'default': [1, 0, 1, 2]};
  for (var i = 0; i < 100; ++i) {
    var sprite = new ne.SpriteSheet();
    sprite.motions = this._motions;
    sprite.rows = 1;
    sprite.columns = 3;
    sprite.texture = loader.texture('test');
    sprite.startMotion('default', 150);
    sprite.tone = ne.Tone.RANDOM;
    whenDone(sprite);
    this.add(sprite);
    this._sprites.push(sprite);
  }
  loopBg(this._background);
}
/*
sprites = [];

var length = randomInt(500, 500);

var pixmap = new ne.Pixmap(100, 100);
var c1 = ne.Color.RANDOM;
var c2 = c1.clone().complement();
c1.alpha = randomInt(128, 255);
c2.alpha = randomInt(128, 255);
var rect = pixmap.rect;
pixmap.fillRect(rect, c1);
pixmap.strokeRect(rect, c2, randomInt(5, 10) );
var texture = new ne.Texture(pixmap);

for (var i = 0; i < length; ++i) {
  var spr = new ne.Sprite();
  spr.angle = randomInt(0, 360);
  var flipX = randomInt(0, 10) < 5 ? 1 : -1;
  var flipY = randomInt(0, 10) > 5 ? 1 : -1;
  spr.scale.x = randomNumber(0.5, 1.5) * flipX;
  spr.scale.y = randomNumber(0.5, 1.5) * flipY;
  rect.set(0, 0, rect.width / 2, rect.height / 2);
  pixmap.fillRect(rect, c2);
  spr.texture = texture;
  spr.offset.x = spr.texture.width / 2;
  spr.offset.y = spr.texture.height / 2;
  spr.position.x = randomInt(50, 430);
  spr.position.y = randomInt(50, 270);
  spr.twig({angle: spr.angle + 36000}, 100000);
  spr.frame.set(0, 0, spr.texture.width, spr.texture.height);
  spr.tone = ne.Tone.RANDOM;
  scene.add(spr);
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
*/

//TODO: automatically start from loader
//scene.start(game, null);

game.goto(scene);
