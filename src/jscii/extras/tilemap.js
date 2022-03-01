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