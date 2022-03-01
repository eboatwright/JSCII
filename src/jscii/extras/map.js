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