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