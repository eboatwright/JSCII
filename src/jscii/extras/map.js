// A data class that holds information about a Tile in a tileset
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

// Extend this class to make your own map rendering
class Map extends Entity {
	constructor(id = "", tiles = [], tileSize = 8, tags = [], position = vZero()) {
		super(id, position, tags);
		this.tiles = tiles;
		this.tileSize = tileSize;
	}

	render(level) {
		// Throw an error, if you try to render on an empty Map
		throw new Error("cannot render 'Map' You must extend this class");
	}
}

class Tilemap extends Map {
	constructor(id = "", tileset = [], tiles = [], tileSize = 8, tags = [], position = vZero()) {
		super(id, tiles, tileSize, tags, position);
		this.tileset = tileset;
		// This is for checking if there is a lightmap, and if so only render tiles that are in the light
		this.onlyRenderInLight = false;
	}

	getTile(x, y) {
		// Return the Tile from the tileset at the x, y position
		return this.tileset[this.tiles[y][x]];
	}

	init(level) {
		// Check if there's a lightmap
		if(level.lightmap !== undefined)
			this.onlyRenderInLight = true;
	}

	render(level) {
		for(var y = 0; y < this.tiles.length; y++) {
			for(var x = 0; x < this.tiles[y].length; x++) {
				// If there is a lightmap, and it's out of sight don't render it
				if(this.onlyRenderInLight
				&& level.lightmap.tiles[y][x] == 1)
					continue;
				FONT.renderChar(this.getTile(x, y).char, x, y, this.getTile(x, y).fgColor, this.getTile(x, y).bgColor);
			}
		}
	}
}

class Lightmap extends Map {
	constructor(id = "", tiles = [], tileSize = 8, tags = [], position = vZero()) {
		super(id, tiles, tileSize, tags, position);
	}

	init(level) {
		// Update the lightmap at the beginning so that the world doesn't start out pitch black
		this.update(level);
	}

	update(level) {
		// Reset the lightmap
		level.lightmap.tiles = init2DArray(WIDTH_TILE, HEIGHT_TILE, 1);
		const player = level.getEntityWithTag("player");
		const tile = level.tilemap.getTile(player.position.x, player.position.y);
		if(tile.hasTag("tunnel")) { // If the player is in a tunnel, then only set a small area of light
			for(var yOff = -1; yOff < 2; yOff++)
				for(var xOff = -1; xOff < 2; xOff++)
					this.tiles[player.position.y + yOff][player.position.x + xOff] = 0;
		} else if(tile.hasTag("roomLighted")) {
			var x1 = 0;
			var y1 = 0;
			var x2 = 0;
			var y2 = 0;

			// Find the top left corner of the room
			while(level.tilemap.getTile(player.position.x + x1, player.position.y).hasTag("roomLighted"))
				x1 -= 1;
			while(level.tilemap.getTile(player.position.x, player.position.y + y1).hasTag("roomLighted"))
				y1 -= 1;
			// Find the bottom right corner of the room
			while(level.tilemap.getTile(player.position.x + x2, player.position.y).hasTag("roomLighted"))
				x2 += 1;
			while(level.tilemap.getTile(player.position.x, player.position.y + y2).hasTag("roomLighted"))
				y2 += 1;

			// Set all the tiles
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