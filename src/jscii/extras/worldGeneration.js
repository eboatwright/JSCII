// Extend from this class to make your world generation (You don't have to use this if you want to make your own)
class WorldGenerator {
	constructor(width, height) {
		this.width = width;
		this.height = height;
	}

	// Throw an error if you try to use this class without extending
	generate() {
		throw new Error("Cannot generate with a 'WorldGenerator'. You must extend this class");
	}
}

// This one's pretty complex. If you want a good tutorial on how to do something like this, go here:
// https://rogueliketutorials.com/tutorials/tcod/v2/part-3/
class DungeonGenerator extends WorldGenerator {
	constructor(tilemap, minRoomSize = vector2(8, 8), maxRoomSize = vector2(16, 16), maxTries = 100, floorTiles = [1, 2], wallTile = 3, tunnelTile = 4, posOffset = vOne(), sizeOffset = vZero(), doors = true, level = undefined) {
		super(tilemap.tiles[0].length, tilemap.tiles.length);
		this.tilemap = tilemap;
		this.minRoomSize = minRoomSize;
		this.maxRoomSize = maxRoomSize;
		this.maxTries = maxTries;
		this.floorTiles = floorTiles;
		this.wallTile = wallTile;
		this.tunnelTile = tunnelTile;
		this.posOffset = posOffset;
		this.sizeOffset = sizeOffset;
		this.doors = doors;
		this.level = level;
		this.tries = 0;
		this.rooms = [];
	}

	createRoom() {
		// Generate a random position, and size for the room
		const rect = new Rect(
			vector2(
				Math.floor(randomRange(this.posOffset.x, this.width - this.maxRoomSize.x - this.sizeOffset.x)),
				Math.floor(randomRange(this.posOffset.y, this.height - this.maxRoomSize.y - this.sizeOffset.y))
			),
			vector2(
				Math.floor(randomRange(this.minRoomSize.x, this.maxRoomSize.x)),
				Math.floor(randomRange(this.minRoomSize.y, this.maxRoomSize.y))
			)
		);
		// If it overlaps with any room, skip it
		for(const room of this.rooms)
			if(room.overlaps(new Rect(rect.position.minus(1), rect.size.plus(2))))
				return;

		// If it doesn't overlap any other room, set all the tiles in the tilemap
		for(var y = 0; y < rect.size.y; y++) {
			for(var x = 0; x < rect.size.x; x++) {
				var tile = randomInArray(this.floorTiles);

				if(x == 0
				|| y == 0
				|| x == rect.size.x - 1
				|| y == rect.size.y - 1)
					tile = this.wallTile;

				this.tilemap.tiles[y + rect.position.y][x + rect.position.x] = tile;
			}
		}

		// Add it to the list
		this.rooms.push(rect);
	}

	generateRooms(tries) {
		// This is here, because if a room fails it won't place a room. So we need to try many times to get a decent amount of rooms
		while(this.tries < this.maxTries) {
			this.createRoom();
			this.tries += 1;
		}
	}

	// For adding a door
	addDoor(x, y) {
		// This just checks it's 8 neighbors, and counts how many tunnel tiles are in beside it.
		var tunnels = 0;
		for(var yOff = -1; yOff < 1; yOff++)
			for(var xOff = -1; xOff < 1; xOff++)
				if(this.level.tilemap.tiles[y + yOff][x + xOff] == this.tunnelTile)
					tunnels += 1;

		// If there's more than 2 tunnels, that means we're in at least a 2 wide doorway, and we don't want to put a door there
		if(tunnels <= 2)
			this.level.addEntity(new Door(vector2(x, y)));
	}

	// Generate a horizontal tunnel from a to b
	createHorizontalTunnel(x1, x2, y) {
		for(var x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
			if(this.tilemap.tiles[y][x] == this.wallTile
			&& this.doors
			&& Math.floor(randomRange(0, 3)) == 0)
				this.addDoor(x, y);
			
			if(!this.tilemap.getTile(x, y).hasTag("floor"))
				this.tilemap.tiles[y][x] = this.tunnelTile;
		}
	}

	// Generate a vertical tunnel from a to b
	createVerticalTunnel(y1, y2, x) {
		for(var y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
			if(this.tilemap.tiles[y][x] == this.wallTile
			&& this.doors
			&& Math.floor(randomRange(0, 3)) == 0)
				this.addDoor(x, y);

			if(!this.tilemap.getTile(x, y).hasTag("floor"))
				this.tilemap.tiles[y][x] = this.tunnelTile;
		}
	}

	// Connect all the rooms with tunnels
	generateTunnels() {
		// So. This method works by starting with room 0, (room 0 will be anywhere, since all the rooms are at a random position)
		// then connecting it to room 1, then connecting room 1 to room 2 and so on until there's no more rooms.

		// Start at room 0
		var lastPos = this.rooms[0].center().rounded();
		for(var i = 1; i < this.rooms.length; i++) {
			var roomTo = this.rooms[i];
			var positionTo = roomTo.center().rounded();

			// Flip a coin to go horizontal, or vertical first
			if(flipCoin()) {
				this.createHorizontalTunnel(lastPos.x, positionTo.x, lastPos.y);
				this.createVerticalTunnel(lastPos.y, positionTo.y, positionTo.x);
			} else {
				this.createVerticalTunnel(lastPos.y, positionTo.y, lastPos.x);
				this.createHorizontalTunnel(lastPos.x, positionTo.x, positionTo.y);
			}

			// Set the last position to the current rooms position,
			lastPos = positionTo;
		}
	}

	placePlayer() {
		// Pick a random room, and return the center of it for the player's spawn position
		const room = randomInArray(this.rooms);
		return room.center().rounded();
	}

	generate() {
		this.generateRooms();
		this.generateTunnels();

		return this.placePlayer();
	}
}