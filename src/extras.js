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
class Tilemap extends Entity {
	constructor(tileset, tiles, tileSize) {
		this.tileset = tileset;
		this.tiles = tiles;
		this.tileSize = tileSize;
	}

	render() {
		for(var y = 0; y < this.tiles.length; y++) {
			for(var x = 0; x < this.tiles[y].length; x++) {
				FONT.drawChar(this.tileset[this.tiles[y][x]], x * 8, y * 8);
			}
		}
	}
}

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

