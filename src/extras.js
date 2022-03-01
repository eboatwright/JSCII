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
		throw new Error("Cannot init an empty Component!");
	}

	update() {
		throw new Error("Cannot update an empty Component!");
	}

	render() {
		throw new Error("Cannot render an empty Component!");
	}
}

class CharRenderer extends Component {
	constructor(entity, char = QUESTION, fgColor = WHITE, bgColor = BLACK) {
		super(entity);
		this.char = char;
		this.fgColor = fgColor;
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
		throw new Error("Cannot call perform on 'Action'")
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

// extras/tilemap.js
class Tile {
	constructor(glyph = QUESTION, fgColor = WHITE, bgColor = BLACK, tags = []) {
		this.glyph = glyph;
		this.fgColor = fgColor;
		this.bgColor = bgColor;
		this.tags = tags;
	}
}

class Tilemap extends Entity {
	constructor(tileset = [], tiles = [], tileSize = 8) {
		super();
		this.tileset = tileset;
		this.tiles = tiles;
		this.tileSize = tileSize;
	}

	getTile(x, y) {
		return this.tileset[this.tiles[y][x]];
	}

	init() {}

	update() {}

	render() {
		for(var y = 0; y < this.tiles.length; y++)
			for(var x = 0; x < this.tiles[y].length; x++)
				FONT.renderChar(this.getTile(x, y).glyph, x, y, this.getTile(x, y).fgColor, this.getTile(x, y).bgColor);
	}

	onDestroy() {}
}

// extras/level.js
class Level {
	constructor(tilemap = new Tilemap()) {
		this.tilemap = tilemap;
		this.entities = [];
		this.entities.push(tilemap);
	}

	addEntity(entity) {
		this.entities.push(entity);
	}

	init() {
		for(var entity of this.entities)
			entity.init();
	}

	update() {
		for(var entity of this.entities)
			entity.update();

		this.entities = this.entities.filter(function(value, index, array) {
			if(value.destroyed)
				value.onDestroy();
			return !value.destroyed;
		});
	}

	render() {
		for(var entity of this.entities)
			entity.render();
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

