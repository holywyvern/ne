var game = new ne.Game('game-wrapper', 480, 320);

var scene = new ne.Scene();

game.goto(scene);

var pixmap = new ne.Pixmap(100, 100);

pixmap.strokeRect(pixmap.rect, ne.Color.RED);

var texture = new ne.Texture(pixmap);

var sprite = new ne.Sprite();

sprite.texture = texture;

sprite.x += 100;
sprite.y += 100;

scene.add(sprite);

//TODO: automatically start from loader
scene.start(game, null);
