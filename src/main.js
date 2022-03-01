const WIDTH_TILE = 53;
const HEIGHT_TILE = 33;

var tilemap = new Tilemap(
	"tilemap",
	[
		new Tile(SPACE, BLACK, BLACK, ["solid"]),
		new Tile(PERIOD, MID_GRAY, BLACK, ["floor"]),
		new Tile(COMMA, MID_GRAY, BLACK, ["floor"]),
		new Tile(TOP_HORIZONTAL_LINE_3, MID_GRAY, DARK_GRAY, ["solid"]),
		new Tile(HASH, MID_GRAY, DARK_GRAY, []),
	],
	init2DArray(WIDTH_TILE, HEIGHT_TILE),
);
const dungeonGenerator = new DungeonGenerator(tilemap, vector2(8, 8), vector2(16, 16), 130);
var level;

class Player extends Entity {
	constructor(position = vZero()) {
		super("player", position, ["player"]);
		this.renderer = new CharRenderer(this, "default", AT, LIGHT_BROWN, DARK_GRAY);
	}

	update() {
		var direction = vector2(0, 0);
		if(keyJustDown("ArrowUp"))
			direction.y -= 1;
		if(keyJustDown("ArrowDown"))
			direction.y += 1;
		if(keyJustDown("ArrowLeft"))
			direction.x -= 1;
		if(keyJustDown("ArrowRight"))
			direction.x += 1;

		if(direction.magnitude() > 0)
			new MoveAction(this, level, direction).perform();
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
		new Lightmap()
	);

	level.addEntity(
		new Player(playerPosition)
	);

	level.init();

	return true;
}

update = function() {
	level.update();
}

render = function() {
	level.render();
}