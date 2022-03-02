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
class DungeonGenerator extends WorldGenerator {
	constructor(tilemap, minRoomSize = vector2(8, 8), maxRoomSize = vector2(16, 16), maxTries = 50) {
		super(tilemap.tiles[0].length, tilemap.tiles.length);
		this.tilemap = tilemap;
		this.minRoomSize = minRoomSize;
		this.maxRoomSize = maxRoomSize;
		this.maxTries = maxTries;
		this.tries = 0;
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
			if(room.overlaps(new Rect(rect.position.minus(1), rect.size.plus(2))))
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

	generateRooms(tries) {
		while(this.tries < this.maxTries) {
			this.createRoom();
			this.tries += 1;
		}
	}

	createHorizontalTunnel(x1, x2, y) {
		for(var x = Math.min(x1, x2); x <= Math.max(x1, x2); x++)
			if(!this.tilemap.getTile(x, y).tags.includes("floor"))
				this.tilemap.tiles[y][x] = 4;
	}

	createVerticalTunnel(y1, y2, x) {
		for(var y = Math.min(y1, y2); y <= Math.max(y1, y2); y++)
			if(!this.tilemap.getTile(x, y).tags.includes("floor"))
				this.tilemap.tiles[y][x] = 4;
	}

	generateTunnels() {
		var roomsLeft = copyArray(this.rooms);
		var lastPos = roomsLeft[0].position.plus(roomsLeft[0].size.multipliedBy(0.5).rounded());
		roomsLeft.splice(0, 1);
		while(roomsLeft.length > 0) {
			var roomToIndex = randomIndex(roomsLeft);
			var roomTo = roomsLeft[roomToIndex];
			var positionTo = roomTo.position.plus(roomTo.size.multipliedBy(0.5).rounded());

			if(randomRange(0, 2) == 0) {
				this.createHorizontalTunnel(lastPos.x, positionTo.x, lastPos.y);
				this.createVerticalTunnel(lastPos.y, positionTo.y, positionTo.x);
			} else {
				this.createVerticalTunnel(lastPos.y, positionTo.y, lastPos.x);
				this.createHorizontalTunnel(lastPos.x, positionTo.x, positionTo.y);
			}

			lastPos = positionTo;
			roomsLeft.splice(roomToIndex, 1);
		}
	}

	placePlayer() {
		const room = randomInArray(this.rooms);
		return room.position.plus(room.size.multipliedBy(0.5).rounded());
	}

	generate() {
		this.generateRooms();
		this.generateTunnels();

		return this.placePlayer();
	}
}