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
var level;

class PickupAction extends Action {
	constructor(entity, level) {
		super(entity);
		this.level = level;
	}

	perform() {
		for(var entity of this.level.getEntitiesAtPosition(this.entity.position)) {
			if(entity.hasTag("item")) {
				var result = this.entity.inventory.pickup(entity);
				if(result == "full")
					this.level.getEntityById("log").renderer.text = "FULL INVENTORY";
				else
					this.level.getEntityById("log").renderer.text = `PICKED UP ${entity.name}`;
			}
		}
	}
}

class OpenAction extends Action {
	constructor(entity, level) {
		super(entity);
		this.level = level;
	}

	perform() {
		for(var entity of level.getEntitiesInRect(new Rect(this.entity.position.minus(1), vector2(3, 3)))) {
			if(entity.hasTag("openable")) {
				this.level.getEntityById("log").renderer.text = `OPENED ${entity.id}`;
				if(entity.hasTag("chest"))
					this.level.addEntity(entity.item);
				entity.destroy();
			}
		}
	}
}

class Chest extends Entity {
	constructor(position = vZero(), item) {
		super("chest", position, ["openable", "chest"]);
		this.renderer = new CharRenderer(this, "default", BOTTOM_HALF, MID_BROWN, BLACK);
		this.item = item;
	}

	render(level) {
		this.renderer.render(level);
	}
}

class PlayerController extends Component {
	constructor(entity) {
		super(entity);

		this.moveTimer = 0;
		this.inventoryPanel = undefined;
		this.dropping = false;
	}

	openInventory(level) {
		return level.addEntity(new InventoryPanel());
	}

	closeInventory(level) {
		this.inventoryPanel.destroy();
		this.inventoryPanel = undefined;
	}

	dropIndex(index, level) {
		var item = this.entity.inventory.dropIndex(index);
		if(item === null)
			return;
		item.position = this.entity.position.copy();
		level.addEntity(item);
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
				this.moveTimer = 2;
				new MoveAction(this.entity, level, direction).perform();
				level.lightmap.update(level);
			}
		} else
			this.moveTimer = 0;

		if(keyJustDown("."))
			new PickupAction(this.entity, level).perform();

		if(keyJustDown("o"))
			new OpenAction(this.entity, level).perform();

		if(this.inventoryPanel === undefined) {
			if(keyJustDown("i"))
				this.inventoryPanel = this.openInventory(level);
		} else
			if(keyJustDown("Escape"))
				this.closeInventory(level);

		if(this.dropping) {
			if(this.inventoryPanel === undefined)
				this.inventoryPanel = this.openInventory(level);
			var key = anyJustDown(ALPHABET);
			if(key !== null) {
				var index = -1;

				for(var i = 0; i < ALPHABET.length; i++) {
					if(ALPHABET[i] == key) {
						index = i;
						break;
					}
				}

				if(index != -1)
					this.dropIndex(index, level);

				this.closeInventory(level);
				this.dropping = false;
			}
		}

		if(keyJustDown("d"))
			this.dropping = true;
	}
}

class Player extends Entity {
	constructor(position = vZero()) {
		super("player", position, ["player"]);
		this.controller = new PlayerController(this);
		this.inventory = new Inventory(this, 23);
		this.health = new HealthStat(this);
		this.magic = new MagicStat(this);
		this.renderer = new CharRenderer(this, "default", AT, LIGHT_BROWN, DARK_GRAY);
	}

	update(level) {
		this.controller.update(level);
		var hud = level.getEntityById("hud");
		hud.renderer.text = `HP: ${this.health.value} | MP: ${this.magic.value}`;
	}

	render(level) {
		this.renderer.render(level);
	}
}

class Enemy extends Entity {
	constructor(id = "enemy", position = vZero(), tags = ["enemy", "solid"]) {
		super(id, position, tags);
		this.health = new HealthStat(this, 2, 2);
		this.health.onZero = this.onZero;

		this.renderer = new CharRenderer(this, "default", S, MID_DARK_GREEN, DARK_GRAY);
	}

	update(level) {
	}

	render(level) {
		this.renderer.render(level);
	}

	// From the HealthStat's point of view
	onZero() {
		this.entity.destroy();
	}
}

class InventoryPanel extends Panel {
	constructor() {
		super("inventoryPanel", vector2(33, 4), vector2(19, 25), LIGHT_GRAY, BLACK, "ui", ["ui"]);
		this.textRenderer = new TextRenderer(this, "ui", "inventory", WHITE, BLACK);
	}

	update(level) {
		this.textRenderer.text = "INVENTORY:\n" + level.getEntityById("player").inventory.getMarked();
	}

	render(level) {
		this.renderer.render(level);
		this.textRenderer.render(level);
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

	level = new Level(
		["item", "default", "lighting", "ui"],
		tilemap,
		new Lightmap("lightmap", init2DArray(WIDTH_TILE, HEIGHT_TILE, 1))
	);

	dungeonGenerator = new DungeonGenerator(tilemap, vector2(6, 6), vector2(15, 15), 210, [1, 2], 3, 4, vector2(1, 4), vector2(0, 2), true, level);
	const playerPosition = dungeonGenerator.generate();

	var sapphireStaff = new Item("item", playerPosition.minus(2), "SAPPHIRE STAFF", new CharRenderer(null, "item", FWD_SLASH, MID_BLUE, BLACK));
	level.addEntity(new Chest(playerPosition.minus(2), sapphireStaff));

	level.addEntity(new Enemy("snake", playerPosition.plus(1)));

	level.addEntity(new Player(playerPosition));

	level.addEntity(new Text("hud", vector2(1, 1), "HP: X", WHITE, BLACK));
	level.addEntity(new Seperator(vector2(0, 2), LIGHT_GRAY));

	level.addEntity(new Seperator(vector2(0, 30), LIGHT_GRAY));
	level.addEntity(new Text("log", vector2(1, 32), "WELCOME!", WHITE, BLACK));

	level.init();

	return true;
}

update = function() {
	level.update();
}

render = function() {
	level.render();
}