var game = new ne.Game('game-wrapper', 480, 320);

var scene = new ne.Scene();

game.goto(scene);

sprites = [];

var length = randomInt(10, 20);

for (var i = 0; i < length; ++i) {
  var spr = new ne.Sprite();
  spr.angle = randomInt(0, 360);
  var flipX = randomInt(0, 10) < 5 ? 1 : -1;
  var flipY = randomInt(0, 10) > 5 ? 1 : -1;
  spr.scale.x = randomNumber(0.5, 1.5) * flipX;
  spr.scale.y = randomNumber(0.5, 1.5) * flipY;
  var pixmap = new ne.Pixmap(100, 100);
  var c1 = ne.Color.RANDOM;
  var c2 = c1.clone().complement();
  c1.alpha = randomInt(128, 255);
  //c2.alpha = randomInt(128, 255);
  var rect = pixmap.rect;
  pixmap.fillRect(rect, c1);
  pixmap.strokeRect(rect, c2, randomInt(5, 10) );
  rect.set(0, 0, rect.width / 2, rect.height / 2);
  pixmap.fillRect(rect, c2);
  var texture = new ne.Texture(pixmap);

  spr.texture = texture;
  spr.offset.x = spr.texture.width / 2;
  spr.offset.y = spr.texture.height / 2;
  spr.position.x = randomInt(0, 380);
  spr.position.y = randomInt(0, 220);
  spr.twig({angle: spr.angle + 36000}, 100000);
  scene.add(spr);
}

function randomInt(min, max) {
  return Math.floor( Math.random() * (max - min) + min);
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

//TODO: automatically start from loader
scene.start(game, null);
