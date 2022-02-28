// extras/PECS.js
// PECS stands for Pseudo-ECS :)

class Entity {
	constructor(position = VZERO) {
		this.position = position;
		this.components = [];
	}

	add(component) {
		this.components.push(component);
		return this;
	}

	update() {
	}

	render() {
	}
}

class Renderer {
	constructor() {
	}
}

var player = new Entity()
		.add(new Renderer());

// extras/action.js
class Action {
	constructor(entity) {
		this.entity = entity;
	}

	perform() {}
}

class MoveAction extends Action {
	constructor(entity, direction) {
		super(entity);
		this.direction = direction;
	}

	perform() {
		this.entity.position += direction;
		if(this.entity.collides())
			this.entity.position -= direction;
	}
}

// extras/tilemap.js
class Tile {
	constructor(glyph, fgColor = WHITE, bgColor = BLACK, tags = []) {
		this.glyph = glyph;
		this.fgColor = fgColor;
		this.bgColor = bgColor;
		this.tags = tags;
	}
}

class Tilemap extends Entity {
	constructor(tileset, tiles, tileSize) {
		super();
		this.tileset = tileset;
		this.tiles = tiles;
		this.tileSize = tileSize;
	}

	getTile(x, y) {
		return this.tileset[this.tiles[y][x] - 1];
	}

	render() {
		for(var y = 0; y < this.tiles.length; y++)
			for(var x = 0; x < this.tiles[y].length; x++)
				if(this.tiles[y][x] > 0)
					FONT.renderChar(this.getTile(x, y).glyph, x, y, this.getTile(x, y).fgColor, this.getTile(x, y).bgColor);
	}
}

