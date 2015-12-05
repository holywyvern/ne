var game = new ne.Game('game-wrapper', 480, 320);

var scene = new ne.Scene();

game.goto(scene);

var pixmap = new ne.Pixmap(100, 100);

pixmap.fillRect(pixmap.rect, new ne.Color(255, 255, 255, 128));
pixmap.strokeRect(pixmap.rect, new ne.Color(255, 0, 0, 128), 10 );

var texture = new ne.Texture(pixmap);

var sprite1 = new ne.Sprite();

sprite1.texture = texture;

sprite1.x += 100;
sprite1.y += 100;

scene.add(sprite1);

var sprite2 = new ne.Sprite();

sprite2.texture = texture;

sprite2.x += 50;
sprite2.y += 50;

scene.add(sprite2);

//TODO: automatically start from loader
scene.start(game, null);
