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

			for(var y = y1; y < y2; y++)
				for(var x = x1; x < x2; x++)
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