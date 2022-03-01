class WorldGenerator {
	constructor(width, height) {
		this.width = width;
		this.height = height;
	}

	generate() {
		throw new Error("Cannot generate with a 'WorldGenerator'. You must extend this class");
	}
}

// TODO: make usable for games that aren't mine XD
// TODO: deal with even number of rooms properly
class DungeonGenerator extends WorldGenerator {
	constructor(tilemap, minRoomSize = vector2(8, 8), maxRoomSize = vector2(18, 18), maxTries = 30) {
		super(tilemap.tiles[0].length, tilemap.tiles.length);
		this.tilemap = tilemap;
		this.minRoomSize = minRoomSize;
		this.maxRoomSize = maxRoomSize;
		this.maxTries = maxTries;
		this.rooms = [];
	}

	createRoom() {
		const rect = new Rect(
			vector2(
				Math.floor(randomRange(1, this.tilemap.tiles[0].length - this.maxRoomSize.x)),
				Math.floor(randomRange(1, this.tilemap.tiles.length - this.maxRoomSize.y))
			),
			vector2(
				Math.floor(randomRange(this.minRoomSize.x, this.maxRoomSize.x)),
				Math.floor(randomRange(this.minRoomSize.y, this.maxRoomSize.y))
			)
		);
		for(const room of this.rooms)
			if(room.overlaps(new Rect(rect.position.minus(vOne()), rect.size.plus(vector2(2, 2)))))
				return;

		for(var y = 0; y < rect.size.y; y++) {
			for(var x = 0; x < rect.size.x; x++) {
				var tile = Math.floor(randomRange(1, 3));

				if(x == 0
				|| y == 0
				|| x == rect.size.x - 1
				|| y == rect.size.y - 1)
					tile = 3;

				this.tilemap.tiles[y + rect.position.y][x + rect.position.x] = tile;
			}
		}
		this.rooms.push(rect);
	}

	createHorizontalTunnel(x1, x2, y) {
		for(var x = Math.min(x1, x2); x < Math.max(x1, x2); x++)
			if(!this.tilemap.getTile(x, y).tags.includes("floor"))
				this.tilemap.tiles[y][x] = 4;
	}

	createVerticalTunnel(y1, y2, x) {
		for(var y = Math.min(y1, y2); y < Math.max(y1, y2); y++)
			if(!this.tilemap.getTile(x, y).tags.includes("floor"))
				this.tilemap.tiles[y][x] = 4;
	}

	placePlayer() {
		const room = randomInArray(this.rooms);
		return room.position.plus(room.size.dividedBy(vector2(2, 2)).rounded());
	}

	generateTunnels() {
		while(this.rooms.length > 1) {
			var aIndex = randomIndex(this.rooms);
			var bIndex = randomIndex(this.rooms);
			if(aIndex == bIndex)
				continue;

			var a = this.rooms[aIndex];
			var b = this.rooms[bIndex];
			this.rooms.splice(aIndex, 1);
			this.rooms.splice(bIndex, 1);

			this.createHorizontalTunnel(a.position.x + Math.round(a.size.x * 0.5), b.position.x + Math.round(b.size.x * 0.5), a.position.y);
		}
	}

	generate() {
		for(var i = 0; i < this.maxTries; i++)
			this.createRoom();

		const playerPosition = this.placePlayer();

		this.generateTunnels();

		return playerPosition;
	}
}