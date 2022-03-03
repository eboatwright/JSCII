// extras/PECS.js
// PECS stands for Pseudo-ECS :)

class Entity {
	constructor(id = "", position = vZero(), tags = []) {
		this.id = id;
		this.position = position;
		this.tags = tags;
		this.destroyed = false;
	}

	addTag(tag) {
		if(!this.hasTag(tag))
			tags.push(tag);
	}

	removeTag(tag) {
		this.tags = this.tags.filter(function(value, index, array) {
			return !value == tag;
		});
	}

	hasTag(tag) {
		return this.tags.includes(tag);
	}

	destroy() {
		this.destroyed = true;
	}

	init(level) {}
	update(level) {}
	render(level) {}
}

class Component {
	constructor(entity) {
		this.entity = entity
	}

	init(level) {
		throw new Error("Cannot init an empty Component! You must extend this class");
	}

	update(level) {
		throw new Error("Cannot update an empty Component! You must extend this class");
	}

	render(level) {
		throw new Error("Cannot render an empty Component! You must extend this class");
	}
}

class Renderer extends Component {
	constructor(entity, layer = "default", fgColor = WHITE, bgColor = BLACK) {
		super(entity);
		this.layer = layer;
		this.fgColor = fgColor;
		this.bgColor = bgColor;
	}

	render(level) {
		throw new Error("Cannot render an empty renderer! You must extend this class");
	}
}

class CharRenderer extends Renderer {
	constructor(entity, layer = "default", char = QUESTION, fgColor = WHITE, bgColor = BLACK) {
		super(entity, layer, fgColor, bgColor);
		this.char = char;
	}

	render(level) {
		FONT.renderChar(this.char, this.entity.position.x, this.entity.position.y, this.fgColor, this.bgColor);
	}
}

class ArrayRenderer extends Renderer {
	constructor(entity, layer = "default", array = [QUESTION], fgColor = WHITE, bgColor = BLACK) {
		super(entity, layer, fgColor, bgColor);
		this.array = array;
	}

	render(level) {
		FONT.renderArray(this.array, this.entity.position.x, this.entity.position.y, this.fgColor, this.bgColor);
	}
}

// extras/action.js
class Action {
	constructor(entity) {
		this.entity = entity;
		this.performed = false;
	}

	perform() {
		throw new Error("Cannot call perform on 'Action' You must extend this class")
	}
}

class NoAction extends Action {
	constructor() {
		super(null);
	}

	perform() {
		if(this.performed)
			throw new Error("Cannot call same Action object twice");
		this.performed = true;
	}
}

class MoveAction extends Action {
	constructor(entity, level, direction = vZero()) {
		super(entity);
		this.level = level;
		this.direction = direction;
	}

	perform() {
		if(this.performed)
			throw new Error("Cannot call same Action object twice");
		this.entity.position.add(this.direction);

		if(this.level.tilemap.getTile(this.entity.position.x, this.entity.position.y).tags.includes("solid"))
			this.entity.position.subtract(this.direction);

		this.performed = true;
	}
}

// extras/ui.js
class PanelRenderer extends Renderer {
	constructor(entity, layer = "ui", size = vOne(), fgColor = WHITE, bgColor = BLACK) {
		super(entity, layer, fgColor, bgColor);
		this.size = size;
	}

	render(level) {
		for(var y = 0; y < this.size.y; y++){
			for(var x = 0; x < this.size.x; x++) {
				var char = SPACE;

				if(x == 0) {
					char = LEFT_VERTICAL_LINE_3;
					if(y == 0)
						char = FWD_SLASH;
					if(y == this.size.y - 1)
						char = BACK_DIAGONAL_LINE;
				} else if(x == this.size.x - 1) {
					char = RIGHT_VERTICAL_LINE_3;
					if(y == 0)
						char = BACK_DIAGONAL_LINE;
					if(y == this.size.y - 1)
						char = FWD_SLASH;
				} else {
					if(y == 0)
						char = TOP_HORIZONTAL_LINE_3;
					if(y == this.size.y - 1)
						char = BOTTOM_HORIZONTAL_LINE_3;
				}

				FONT.renderChar(char, this.entity.position.x + x, this.entity.position.y + y, this.fgColor, this.bgColor);
			}
		}
	}
}

class TextRenderer extends Renderer {
	constructor(entity, layer = "ui", text = "", fgColor = WHITE, bgColor = BLACK) {
		super(entity, layer, fgColor, bgColor);
		this.text = text;
	}

	render(level) {
		FONT.renderText(this.text, this.entity.position.x, this.entity.position.y, this.fgColor, this.bgColor);
	}
}

class Text extends Entity {
	constructor(id = "text", position = vZero(), text = "", fgColor = WHITE, bgColor = BLACK, layer = "ui", tags = ["ui"]) {
		super(id, position, tags);
		this.renderer = new TextRenderer(this, layer, text, fgColor, bgColor);
	}

	render(level) {
		this.renderer.render(level);
	}
}

// extras/worldGeneration.js
// DISCLAIMER! This is not finished! *DONT* use in your own projects!

class WorldGenerator {
	constructor(width, height) {
		this.width = width;
		this.height = height;
	}

	generate() {
		throw new Error("Cannot generate with a 'WorldGenerator'. You must extend this class");
	}
}

class DungeonGenerator extends WorldGenerator {
	constructor(tilemap, minRoomSize = vector2(8, 8), maxRoomSize = vector2(16, 16), maxTries = 50) {
		super(tilemap.tiles[0].length, tilemap.tiles.length);
		this.tilemap = tilemap;
		this.minRoomSize = minRoomSize;
		this.maxRoomSize = maxRoomSize;
		this.maxTries = maxTries;
		this.tries = 0;
		this.rooms = [];
	}

	createRoom() {
		const rect = new Rect(
			vector2(
				Math.floor(randomRange(1, this.tilemap.tiles[0].length - this.maxRoomSize.x)),
				Math.floor(randomRange(1, this.tilemap.tiles.length - this.maxRoomSize.y))
			),
			vector2(
				Math.floor(randomRange(this.minRoomSize.x, this.maxRoomSize.x)),
				Math.floor(randomRange(this.minRoomSize.y, this.maxRoomSize.y))
			)
		);
		for(const room of this.rooms)
			if(room.overlaps(new Rect(rect.position.minus(1), rect.size.plus(2))))
				return;

		for(var y = 0; y < rect.size.y; y++) {
			for(var x = 0; x < rect.size.x; x++) {
				// TODO
				var tile = Math.floor(randomRange(1, 3));

				// TODO
				if(x == 0
				|| y == 0
				|| x == rect.size.x - 1
				|| y == rect.size.y - 1)
					tile = 3;

				this.tilemap.tiles[y + rect.position.y][x + rect.position.x] = tile;
			}
		}

		this.rooms.push(rect);
	}

	generateRooms(tries) {
		while(this.tries < this.maxTries) {
			this.createRoom();
			this.tries += 1;
		}
	}

	createHorizontalTunnel(x1, x2, y) {
		for(var x = Math.min(x1, x2); x <= Math.max(x1, x2); x++)
			if(!this.tilemap.getTile(x, y).tags.includes("floor"))
				// TODO
				this.tilemap.tiles[y][x] = 4;
	}

	createVerticalTunnel(y1, y2, x) {
		for(var y = Math.min(y1, y2); y <= Math.max(y1, y2); y++)
			if(!this.tilemap.getTile(x, y).tags.includes("floor"))
				// TODO
				this.tilemap.tiles[y][x] = 4;
	}

	generateTunnels() {
		var lastPos = this.rooms[0].center().rounded();
		var doneRooms = 1;
		while(doneRooms < this.rooms.length) {
			var roomTo = this.rooms[doneRooms];
			var positionTo = roomTo.center().rounded();

			if(flipCoin()) {
				this.createHorizontalTunnel(lastPos.x, positionTo.x, lastPos.y);
				this.createVerticalTunnel(lastPos.y, positionTo.y, positionTo.x);
			} else {
				this.createVerticalTunnel(lastPos.y, positionTo.y, lastPos.x);
				this.createHorizontalTunnel(lastPos.x, positionTo.x, positionTo.y);
			}

			lastPos = positionTo;

			doneRooms += 1;
		}
	}

	placePlayer() {
		const room = randomInArray(this.rooms);
		return room.center().rounded();
	}

	generate() {
		this.generateRooms();
		this.generateTunnels();

		return this.placePlayer();
	}
}

// extras/nameGeneration.js
class NameGenerator {
	constructor() {}

	generate() {
		throw new Error("cannot generate with empty NameGenerator You must extend this class");
	}
}

class PersonNameGenerator extends NameGenerator {
	constructor(firstNames, firstHalfLastName, secondHalfLastName) {
		super();
		this.firstNames = firstNames;
		this.firstHalfLastName = firstHalfLastName;
		this.secondHalfLastName = secondHalfLastName;
	}

	generate() {
		var result = "";

		result += randomInArray(this.firstNames);
		result += " ";
		result += randomInArray(this.firstHalfLastName);
		result += randomInArray(this.secondHalfLastName);

		return result;
	}
}

// extras/level.js
class Level {
	constructor(renderOrder = ["default", "lighting"], tilemap = new Tilemap(), lightmap = undefined) {
		this.renderOrder = renderOrder;
		this.tilemap = tilemap;
		this.lightmap = lightmap;
		this.entities = [];
	}

	addEntity(entity) {
		this.entities.push(entity);
	}

	getEntityById(id) {
		for(const entity of this.entities)
			if(entity.id == id)
				return entity;
		throw new Error("There is no Entity with the id: " + tag);
	}

	getEntityWithTag(tag) {
		for(const entity of this.entities)
			if(entity.tags.includes(tag))
				return entity;
		throw new Error("There is no Entity with the tag: " + tag);
	}

	getEntitiesWithTag(tag) {
		var entities = [];
		for(const entity of this.entities)
			if(entity.tags.includes(tag))
				entities.push(entity);
		return entities;
	}

	init() {
		this.tilemap.init(this);
		for(var entity of this.entities)
			entity.init(this);
		if(this.lightmap !== undefined)
			this.lightmap.init(this);
	}

	update() {
		this.tilemap.update(this);
		for(var entity of this.entities)
			entity.update(this);

		this.entities = this.entities.filter(function(value, index, array) {
			if(value.destroyed)
				value.onDestroy();
			return !value.destroyed;
		});
	}

	render() {
		this.tilemap.render(this);
		for(const renderLayer of this.renderOrder) {
			if(renderLayer == "lighting"
			&& this.lightmap !== undefined)
				this.lightmap.render(this);
			for(const entity of this.entities)
				if(entity.renderer !== null
				&& entity.renderer !== undefined
				&& entity.renderer.layer == renderLayer)
					entity.render(this);
		}
	}
}

// extras/animations.js
class Animation {
	constructor(id = "default", frames = [], frameDuration = 0, dontInterrupt = false) {
		this.id = id;
		this.frames = frames;
		this.frameDuration = frameDuration;
		this.dontInterrupt = dontInterrupt;
	}
}

class Animator extends Component {
	constructor(entity, animations = [], currentAnimation = 0) {
		super(entity);
		this.animations = animations;
		this.currentAnimation = currentAnimation;
		this.timer = 0;
		this.currentFrameIndex = 0;
		this.dontInterrupt = false;
	}

	update(level) {
		this.timer -= deltaTime;
		if(this.timer <= 0) {
			this.timer = this.animations[this.currentAnimation].frameDuration;
			this.currentFrameIndex += 1;
			if(this.currentFrameIndex >= this.animations[this.currentAnimation].frames.length) {
				this.currentFrameIndex = 0;
			}
		}
	}

	changeAnimation(id) {
		if(this.dontInterrupt)
			return;
		for(var i = 0; i < this.animations.length; i++) {
			if(this.animations[i].id == id) {
				this.currentAnimation = i;
				this.timer = 0;
				this.currentFrameIndex = 0;
				this.dontInterrupt = this.animations[i];
			}
		}
	}

	getFrame() {
		return this.animations[this.currentAnimation].frames[this.currentFrameIndex];
	}
}

// extras/rect.js
class Rect {
	constructor(position = vZero(), size = vOne()) {
		this.position = position;
		this.size = size;
	}

	center() {
		return this.position.plus(this.size.multipliedBy(0.5));
	}

	top() { return this.position.y; }
	bottom() { return this.position.y + this.size.y; }
	left() { return this.position.x; }
	right() { return this.position.x + this.size.x; }

	overlaps(other) {
		return this.left() < other.right()
			&& this.right() > other.left()
			&& this.top() < other.bottom()
			&& this.bottom() > other.top();
	}
}

// extras/map.js
class Tile {
	constructor(char = QUESTION, fgColor = WHITE, bgColor = BLACK, tags = []) {
		this.char = char;
		this.fgColor = fgColor;
		this.bgColor = bgColor;
		this.tags = tags;
	}

	hasTag(tag) {
		return this.tags.includes(tag);
	}
}

class Map extends Entity {
	constructor(id = "", tiles = [], tileSize = 8, tags = [], position = vZero()) {
		super(id, position, tags);
		this.tiles = tiles;
		this.tileSize = tileSize;
	}

	getTile(x, y) {
		throw new Error("cannot get tile from 'Map' You must extend this class");
	}

	render(level) {
		throw new Error("cannot render 'Map' You must extend this class");
	}
}

class Tilemap extends Map {
	constructor(id = "", tileset = [], tiles = [], tileSize = 8, tags = [], position = vZero()) {
		super(id, tiles, tileSize, tags, position);
		this.tileset = tileset;
		this.onlyRenderInLight = false;
	}

	getTile(x, y) {
		return this.tileset[this.tiles[y][x]];
	}

	init(level) {
		if(level.lightmap !== undefined) {
			const player = level.getEntityWithTag("player");
			if(level.getEntityWithTag("player") !== undefined
			&& level.getEntityWithTag("player") !== null) {
				this.onlyRenderInLight = true;
			}
		}
	}

	render(level) {
		for(var y = 0; y < this.tiles.length; y++)
			for(var x = 0; x < this.tiles[y].length; x++)
				if(level.lightmap.tiles[y][x] == 0)
					FONT.renderChar(this.getTile(x, y).char, x, y, this.getTile(x, y).fgColor, this.getTile(x, y).bgColor);
	}
}

class Lightmap extends Map {
	constructor(id = "", tiles = [], tileSize = 8, tags = [], position = vZero()) {
		super(id, tiles, tileSize, tags, position);
	}

	getTile(x, y) {
		return this.tiles[y][x];
	}

	init(level) {
		this.update(level);
	}

	update(level) {
		level.lightmap.tiles = init2DArray(WIDTH_TILE, HEIGHT_TILE, 1);
		const player = level.getEntityWithTag("player");
		const tile = level.tilemap.getTile(player.position.x, player.position.y);
		if(tile.hasTag("tunnel")) {
			for(var yOff = -1; yOff < 2; yOff++)
				for(var xOff = -1; xOff < 2; xOff++)
					this.tiles[player.position.y + yOff][player.position.x + xOff] = 0;
		} else if(tile.hasTag("roomLighted")) {
			var x1 = 0;
			var y1 = 0;
			var x2 = 0;
			var y2 = 0;

			while(level.tilemap.getTile(player.position.x + x1, player.position.y).hasTag("roomLighted"))
				x1 -= 1;
			while(level.tilemap.getTile(player.position.x, player.position.y + y1).hasTag("roomLighted"))
				y1 -= 1;
			while(level.tilemap.getTile(player.position.x + x2, player.position.y).hasTag("roomLighted"))
				x2 += 1;
			while(level.tilemap.getTile(player.position.x, player.position.y + y2).hasTag("roomLighted"))
				y2 += 1;

			for(var y = y1; y <= y2; y++)
				for(var x = x1; x <= x2; x++)
					this.tiles[player.position.y + y][player.position.x + x] = 0;
		}
	}

	render(level) {
		for(var y = 0; y < this.tiles.length; y++)
			for(var x = 0; x < this.tiles[y].length; x++)
				if(this.tiles[y][x] == 1)
					FONT.renderChar(SPACE, x, y, BLACK, BLACK);
	}
}

// extras/camera.js
class Camera extends Entity {
	constructor(id = "camera", position = vZero(), tags = ["camera"], target = null) {
		super(id, position, tags);
		if(target !== null)
			this.target = target;
	}

	update(level) {
		if(this.target !== null
		&& this.target !== undefined)
			this.position = this.target.position;
	}

	top() { return this.position.y; }
	bottom() { return this.position.y + SCREEN_HEIGHT; }
	left() { return this.position.x; }
	right() { return this.position.x + SCREEN_WIDTH; }

	tileInView(x, y) {
		return y * TILE_SIZE >= this.top()
			&& y * TILE_SIZE < this.bottom()
			&& x * TILE_SIZE >= this.left()
			&& x * TILE_SIZE < this.right();
	}
}

const CAMERA = new Camera();

