const WIDTH_TILE = 53;
const HEIGHT_TILE = 33;

var tilemap = new Tilemap(
	"tilemap",
	[
		new Tile(SPACE, BLACK, BLACK, ["blank", "solid"]),
		new Tile(PERIOD, MID_GRAY, BLACK, ["floor", "roomLighted"]),
		new Tile(COMMA, MID_GRAY, BLACK, ["floor", "roomLighted"]),
		new Tile(TOP_HORIZONTAL_LINE_3, MID_GRAY, DARK_GRAY, ["solid", "roomLighted"]),
		new Tile(HASH, MID_GRAY, DARK_GRAY, ["tunnel"]),
	],
	init2DArray(WIDTH_TILE, HEIGHT_TILE),
);
const dungeonGenerator = new DungeonGenerator(tilemap, vector2(6, 6), vector2(15, 15), 750);
var level;

class Player extends Entity {
	constructor(position = vZero()) {
		super("player", position, ["player"]);
		this.renderer = new CharRenderer(this, "default", AT, LIGHT_BROWN, DARK_GRAY);
		this.moveTimer = 0;
	}

	update(level) {
		var direction = vector2(0, 0);
		if(keyDown("ArrowUp"))
			direction.y -= 1;
		if(keyDown("ArrowDown"))
			direction.y += 1;
		if(keyDown("ArrowLeft"))
			direction.x -= 1;
		if(keyDown("ArrowRight"))
			direction.x += 1;

		if(direction.magnitude() > 0) {
			this.moveTimer -= deltaTime;
			if(this.moveTimer <= 0) {
				this.moveTimer = 1;
				new MoveAction(this, level, direction).perform();
				level.lightmap.update(level);
			}
		} else {
			this.moveTimer = 0;
		}
	}

	render() {
		this.renderer.render();
	}
}

init = function() {
	const playerPosition = dungeonGenerator.generate();

	level = new Level(
		["default"],
		tilemap,
		new Lightmap("lightmap", init2DArray(WIDTH_TILE, HEIGHT_TILE, 1))
	);

	level.addEntity(
		new Player(playerPosition)
	);

	level.init();
	level.lightmap.update(level);

	return true;
}

update = function() {
	level.update();
}

render = function() {
	level.render();
}