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