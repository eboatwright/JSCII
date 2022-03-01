// extras/PECS.js
// PECS stands for Pseudo-ECS :)

class Entity {
	constructor(position = vZero()) {
		this.position = position;
		this.destroyed = false;
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
		this.lightmap.update();

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

// extras/map.js
class Tile {
	constructor(glyph = QUESTION, fgColor = WHITE, bgColor = BLACK, tags = []) {
		this.glyph = glyph;
		this.fgColor = fgColor;
		this.bgColor = bgColor;
		this.tags = tags;
	}
}

class Map extends Entity {
	constructor(tiles = [], tileSize = 8) {
		super();
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
	constructor(tileset = [], tiles = [], tileSize = 8) {
		super(tiles, tileSize);
		this.tileset = tileset;
	}

	getTile(x, y) {
		return this.tileset[this.tiles[y][x]];
	}

	render() {
		for(var y = 0; y < this.tiles.length; y++)
			for(var x = 0; x < this.tiles[y].length; x++)
				FONT.renderChar(this.getTile(x, y).glyph, x, y, this.getTile(x, y).fgColor, this.getTile(x, y).bgColor);
	}
}

class Lightmap extends Map {
	constructor(tiles = [], tileSize = 8) {
		super(tiles, tileSize);
	}

	getTile(x, y) {
		return this.tiles[y][x];
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
	constructor(position = vZero(), target = null) {
		super(position);
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

