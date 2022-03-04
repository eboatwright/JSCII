const WIDTH_TILE = 53;
const HEIGHT_TILE = 33;

const TILESET = [
	new Tile(SPACE, BLACK, BLACK, ["blank", "solid"]),
	new Tile(PERIOD, MID_GRAY, BLACK, ["floor", "roomLighted"]),
	new Tile(COMMA, MID_GRAY, BLACK, ["floor", "roomLighted"]),
	new Tile(TOP_HORIZONTAL_LINE_3, MID_GRAY, DARK_GRAY, ["solid"]),
	new Tile(HASH, MID_GRAY, DARK_GRAY, ["tunnel"]),
];
var tilemap;
var dungeonGenerator;
var testText;
var level;

class PlayerController extends Component {
	constructor(entity) { super(entity); }

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
				new MoveAction(this.entity, level, direction).perform();
				level.lightmap.update(level);
			}
		} else
			this.moveTimer = 0;
	}
}

class Player extends Entity {
	constructor(position = vZero()) {
		super("player", position, ["player"]);
		this.playerController = new PlayerController(this);
		this.renderer = new CharRenderer(this, "default", AT, LIGHT_BROWN, DARK_GRAY);
		this.moveTimer = 0;
	}

	update(level) {
		this.playerController.update(level);
	}

	render(level) {
		this.renderer.render(level);
	}
}

class Seperator extends Entity {
	constructor(position = vZero(), fgColor = WHITE) {
		super("seperator", position, ["seperator", "hud"]);
		this.renderer = new ArrayRenderer(this, "ui", initArray(WIDTH_TILE, BOTTOM_HORIZONTAL_LINE_3), fgColor, BLACK);
	}

	render(level) {
		this.renderer.render(level);
	}
}

init = function() {
	tilemap = new Tilemap(
		"tilemap",
		TILESET,
		init2DArray(WIDTH_TILE, HEIGHT_TILE)
	);

	dungeonGenerator = new DungeonGenerator(tilemap, vector2(6, 6), vector2(15, 15), 50, [1, 2], 3, 4, vector2(1, 4), vector2(0, 0));

	const playerPosition = dungeonGenerator.generate();

	level = new Level(
		["default", "lighting", "ui"],
		tilemap,
		new Lightmap("lightmap", init2DArray(WIDTH_TILE, HEIGHT_TILE, 1))
	);

	level.addEntity(new Player(playerPosition));

	level.addEntity(new Seperator(vector2(0, 2), LIGHT_GRAY));
	level.addEntity(new Text("text", vector2(1, 1), "HP: 3 | MP: 3", WHITE, BLACK));

	level.init();
}

update = function() {
	level.update();
}

render = function() {
	level.render();
}