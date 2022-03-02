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
		tags.push(tag);
	}

	removeTag(tag) {
		this.tags = this.tags.filter(function(value, index, array) {
			return !value == tag;
		});
	}

	destroy() {
		this.destroyed = true;
	}

	init() {}
	update() {}
	render() {}
}

class Component {
	constructor(entity) {
		this.entity = entity
	}

	init() {
		throw new Error("Cannot init an empty Component! You must extend this class");
	}

	update() {
		throw new Error("Cannot update an empty Component! You must extend this class");
	}

	render() {
		throw new Error("Cannot render an empty Component! You must extend this class");
	}
}

class Renderer extends Component {
	constructor(entity, layer = "default", fgColor = WHITE) {
		super(entity);
		this.layer = layer;
		this.fgColor = fgColor;
	}

	render() {
		throw new Error("Cannot render an empty renderer! You must extend this class");
	}
}

class CharRenderer extends Renderer {
	constructor(entity, layer = "default", char = QUESTION, fgColor = WHITE, bgColor = BLACK) {
		super(entity, layer, fgColor);
		this.char = char;
		this.bgColor = bgColor;
	}

	render() {
		FONT.renderChar(this.char, this.entity.position.x, this.entity.position.y, this.fgColor, this.bgColor);
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

// extras/worldGeneration.js
class WorldGenerator {
	constructor(width, height) {
		this.width = width;
		this.height = height;
	}

	generate() {
		throw new Error("Cannot generate with a 'WorldGenerator'. You must extend this class");
	}
}

// TODO: make usable for games that aren't mine XD
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
				var tile = Math.floor(randomRange(1, 3));

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
				this.tilemap.tiles[y][x] = 4;
	}

	createVerticalTunnel(y1, y2, x) {
		for(var y = Math.min(y1, y2); y <= Math.max(y1, y2); y++)
			if(!this.tilemap.getTile(x, y).tags.includes("floor"))
				this.tilemap.tiles[y][x] = 4;
	}

	generateTunnels() {
		var roomsLeft = copyArray(this.rooms);
		var lastPos = roomsLeft[0].position.plus(roomsLeft[0].size.multipliedBy(0.5).rounded());
		roomsLeft.splice(0, 1);
		while(roomsLeft.length > 0) {
			var roomToIndex = randomIndex(roomsLeft);
			var roomTo = roomsLeft[roomToIndex];
			var positionTo = roomTo.position.plus(roomTo.size.multipliedBy(0.5).rounded());

			if(randomRange(0, 2) == 0) {
				this.createHorizontalTunnel(lastPos.x, positionTo.x, lastPos.y);
				this.createVerticalTunnel(lastPos.y, positionTo.y, positionTo.x);
			} else {
				this.createVerticalTunnel(lastPos.y, positionTo.y, lastPos.x);
				this.createHorizontalTunnel(lastPos.x, positionTo.x, positionTo.y);
			}

			lastPos = positionTo;
			roomsLeft.splice(roomToIndex, 1);
		}
	}

	placePlayer() {
		const room = randomInArray(this.rooms);
		return room.position.plus(room.size.multipliedBy(0.5).rounded());
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
	constructor(renderOrder = ["default"], tilemap = new Tilemap(), lightmap = new Lightmap()) {
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

	getEntityByTag(tag) {
		for(const entity of this.entities)
			if(entity.tags.includes(tag))
				return entity;
		throw new Error("There is no Entity with the tag: " + tag);
	}

	getEntitiesByTag(tag) {
		var entities = [];
		for(const entity of this.entities)
			if(entity.tags.includes(tag))
				entities.push(entity);
		return entities;
	}

	init() {
		this.tilemap.init();
		for(var entity of this.entities)
			entity.init();
		this.lightmap.init();
	}

	update() {
		this.tilemap.update();
		for(var entity of this.entities)
			entity.update();
		this.lightmap.update(this);

		this.entities = this.entities.filter(function(value, index, array) {
			if(value.destroyed)
				value.onDestroy();
			return !value.destroyed;
		});
	}

	render() {
		this.tilemap.render();
		for(const renderLayer of this.renderOrder)
			for(const entity of this.entities)
				if(entity.renderer !== null
				&& entity.renderer !== undefined
				&& entity.renderer.layer == renderLayer)
					entity.render();
		this.lightmap.render();
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

	update() {
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

	render() {
		throw new Error("cannot render 'Map' You must extend this class");
	}
}

class Tilemap extends Map {
	constructor(id = "", tileset = [], tiles = [], tileSize = 8, tags = [], position = vZero()) {
		super(id, tiles, tileSize, tags, position);
		this.tileset = tileset;
	}

	getTile(x, y) {
		return this.tileset[this.tiles[y][x]];
	}

	render() {
		for(var y = 0; y < this.tiles.length; y++)
			for(var x = 0; x < this.tiles[y].length; x++)
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

	// TODO
	update(level) {
		const player = level.getEntityByTag("player");
	}

	render() {
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

	update() {
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

