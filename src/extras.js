// extras/PECS.js
// PECS stands for Pseudo-ECS :)

// Extend from this class to create your own Entity type
class Entity {
	constructor(id = "", position = vZero(), tags = []) {
		this.id = id;
		this.position = position;
		this.tags = tags;
		this.destroyed = false;
	}

	// A helper class for adding a tag if it doesn't have it already
	addTag(tag) {
		if(!this.hasTag(tag))
			tags.push(tag);
	}

	// Filter out the tag specified
	removeTag(tag) {
		this.tags = this.tags.filter(function(value, index, array) {
			return !value == tag;
		});
	}

	hasTag(tag) {
		return this.tags.includes(tag);
	}

	// A helper function for destroying an entity (Removing the Entity will be handled by Level)
	destroy() {
		this.destroyed = true;
	}

	// Override these
	// These don't throw errors, because not every Entity needs *all* the functions
	init(level) {}
	update(level) {}
	render(level) {}
}

// Extend from this class for your components
class Component {
	// Make sure to call this with super(entity)!
	constructor(entity) {
		this.entity = entity
	}

	// Override these
	init(level) {
		throw new Error("Cannot init an empty Component! You must extend this class");
	}

	update(level) {
		throw new Error("Cannot update an empty Component! You must extend this class");
	}

	render(level) {
		throw new Error("Cannot render an empty Component! You must extend this class");
	}
}

// A "middle man" class for making renderers
class Renderer extends Component {
	// The layer is used by Level for rendering order
	constructor(entity, layer = "default", fgColor = WHITE, bgColor = BLACK) {
		super(entity);
		this.layer = layer;
		this.fgColor = fgColor;
		this.bgColor = bgColor;
	}

	// Throw an error if you try to render on an empty Renderer without extending
	render(level) {
		throw new Error("Cannot render an empty renderer! You must extend this class");
	}
}

// Render a single char at the Entity's position
class CharRenderer extends Renderer {
	constructor(entity, layer = "default", char = QUESTION, fgColor = WHITE, bgColor = BLACK) {
		super(entity, layer, fgColor, bgColor);
		this.char = char;
	}

	render(level) {
		FONT.renderChar(this.char, this.entity.position.x, this.entity.position.y, this.fgColor, this.bgColor);
	}
}

// Render an array of chars at the Entity's position (Horizontal)
class ArrayRenderer extends Renderer {
	constructor(entity, layer = "default", array = [QUESTION], fgColor = WHITE, bgColor = BLACK) {
		super(entity, layer, fgColor, bgColor);
		this.array = array;
	}

	render(level) {
		FONT.renderArray(this.array, this.entity.position.x, this.entity.position.y, this.fgColor, this.bgColor);
	}
}

// Render a 2d array of characters at the Entity's position (It starts at the top left, and each array inside the 2d array is a row)
class TwoDArrayRenderer extends Renderer {
	constructor(entity, layer = "default", array = [[QUESTION]], fgColor = WHITE, bgColor = BLACK) {
		super(entity, layer, fgColor, bgColor);
		this.array = array;
	}

	render(level) {
		for(var i = 0; i < this.array.length; i++)
			FONT.renderArray(this.array[i], this.entity.position.x, this.entity.position.y + i, this.fgColor, this.bgColor);
	}
}

// extras/action.js
// Extend this class to create your own action
class Action {
	constructor(entity) {
		// The entity to perform the action on
		this.entity = entity;
	}

	perform() {
		throw new Error("Cannot call perform on 'Action' You must extend this class")
	}
}

// This is for if your function returns an Action, but you don't want to call an "actual" Action, then return this
class NoAction extends Action {
	constructor() {
		super(null);
	}

	perform() {}
}

// This is a very basic class for moving / collision
class MoveAction extends Action {
	// The Entity to move, the level and the direction to move
	constructor(entity, level, direction = vZero()) {
		super(entity);
		this.level = level;
		this.direction = direction;
	}

	perform() {
		// Move the entity
		this.entity.position.add(this.direction);

		// Check if there's a solid tile in the way
		if(this.level.tilemap.getTile(this.entity.position.x, this.entity.position.y).tags.includes("solid"))
			// Move back out of the tile
			this.entity.position.subtract(this.direction);
	}
}

// extras/ui.js
// This just renders a little outline (sort-of) at the Entity's position. Useful for HUD
class PanelRenderer extends Renderer {
	constructor(entity, layer = "ui", size = vOne(), fgColor = WHITE, bgColor = BLACK) {
		super(entity, layer, fgColor, bgColor);
		this.size = size;
	}

	render(level) {
		for(var y = 0; y < this.size.y; y++){
			for(var x = 0; x < this.size.x; x++) {
				var char = SPACE;

				// Render either a -, |, /, or \ depending on the positions
				// (/ and \ for corners, and - and | for edges)
				if(x == 0) {
					char = LEFT_VERTICAL_LINE_3;
					if(y == 0)
						char = FWD_SLASH;
					if(y == this.size.y - 1)
						char = BACK_DIAGONAL_LINE;
				} else if(x == this.size.x - 1) {
					char = RIGHT_VERTICAL_LINE_3;
					if(y == 0)
						char = BACK_DIAGONAL_LINE;
					if(y == this.size.y - 1)
						char = FWD_SLASH;
				} else {
					if(y == 0)
						char = TOP_HORIZONTAL_LINE_3;
					if(y == this.size.y - 1)
						char = BOTTOM_HORIZONTAL_LINE_3;
				}

				FONT.renderChar(char, this.entity.position.x + x, this.entity.position.y + y, this.fgColor, this.bgColor);
			}
		}
	}
}

// Render a string of characters at the position
class TextRenderer extends Renderer {
	constructor(entity, layer = "ui", text = "", fgColor = WHITE, bgColor = BLACK) {
		super(entity, layer, fgColor, bgColor);
		this.text = text;
	}

	render(level) {
		FONT.renderText(this.text, this.entity.position.x, this.entity.position.y, this.fgColor, this.bgColor);
	}
}

// Just an Entity for rendering text
class Text extends Entity {
	constructor(id = "text", position = vZero(), text = "", fgColor = WHITE, bgColor = BLACK, layer = "ui", tags = ["ui"]) {
		super(id, position, tags);
		this.renderer = new TextRenderer(this, layer, text, fgColor, bgColor);
	}

	render(level) {
		this.renderer.render(level);
	}
}

// extras/worldGeneration.js
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
	constructor(tilemap, minRoomSize = vector2(8, 8), maxRoomSize = vector2(16, 16), maxTries = 100, floorTiles = [1, 2], wallTile = 3, tunnelTile = 4, posOffset = vOne(), sizeOffset = vZero()) {
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

	// Generate a horizontal tunnel from a to b
	createHorizontalTunnel(x1, x2, y) {
		for(var x = Math.min(x1, x2); x <= Math.max(x1, x2); x++)
			if(!this.tilemap.getTile(x, y).hasTag("floor"))
				this.tilemap.tiles[y][x] = this.tunnelTile;
	}

	// Generate a vertical tunnel from a to b
	createVerticalTunnel(y1, y2, x) {
		for(var y = Math.min(y1, y2); y <= Math.max(y1, y2); y++)
			if(!this.tilemap.getTile(x, y).hasTag("floor"))
				this.tilemap.tiles[y][x] = this.tunnelTile;
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

// extras/nameGeneration.js
// This is a very simple section

// Extend from this class to make your own name generator
class NameGenerator {
	constructor() {}

	generate() {
		// Throw an error if you try to use this class without extending
		throw new Error("cannot generate with empty NameGenerator You must extend this class");
	}
}

// This class is just a *basic* name generator for generating person's names
class PersonNameGenerator extends NameGenerator {
	constructor(firstNames, firstHalfLastName, secondHalfLastName) {
		// This super() call is required by JavaScript
		super();
		this.firstNames = firstNames;
		this.firstHalfLastName = firstHalfLastName;
		this.secondHalfLastName = secondHalfLastName;
	}

	generate() {
		var result = "";

		result += randomInArray(this.firstNames);
		result += " ";
		result += randomInArray(this.firstHalfLastName);
		result += randomInArray(this.secondHalfLastName);

		return result;
	}
}

// extras/level.js
// This is a class that handles *mostly* Entity management
class Level {
	// lightmap defaults to undefined, because some games might not have lighting
	constructor(renderOrder = ["default", "lighting", "ui"], tilemap = new Tilemap(), lightmap = undefined) {
		this.renderOrder = renderOrder;
		this.tilemap = tilemap;
		this.lightmap = lightmap;
		this.entities = [];
	}

	addEntity(entity) {
		this.entities.push(entity);
	}

	// Returns the first Entity it finds with that ID
	getEntityById(id) {
		for(const entity of this.entities)
			if(entity.id == id)
				return entity;
		throw new Error("There is no Entity with the id: " + tag);
	}

	// Returns the first Entity it finds with that tag
	getEntityWithTag(tag) {
		for(const entity of this.entities)
			if(entity.tags.includes(tag))
				return entity;
		throw new Error("There is no Entity with the tag: " + tag);
	}

	// Returns all entities that have the specified tag
	getEntitiesWithTag(tag) {
		var entities = [];
		for(const entity of this.entities)
			if(entity.tags.includes(tag))
				entities.push(entity);
		return entities;
	}

	// Check if there is an Entity at this position
	isEntityAtPosition(position) {
		for(const entity of this.entities)
			if(entity.position == position)
				return true;
		return false;
	}

	// Returns the Entity at this position
	getEntityAtPosition(position) {
		if(!this.isEntityAtPosition(position))
			return null;
		for(const entity of this.entities)
			if(entity.position == position)
				return entity;
		return null;
	}

	// Returns all the Entities at this position
	getEntitiesAtPosition(position) {
		if(!this.isEntityAtPosition(position))
			return null;
		var entities = [];
		for(const entity of this.entities)
			if(entity.position == position)
				entities.push(entity);
		return entities;
	}

	// Initialize all entities
	init() {
		this.tilemap.init(this);
		for(var entity of this.entities)
			entity.init(this);
		if(this.lightmap !== undefined)
			this.lightmap.init(this);
	}

	// Update all entities
	update() {
		this.tilemap.update(this);
		for(var entity of this.entities)
			entity.update(this);

		// Filter out all entities that were destroyed
		this.entities = this.entities.filter(function(value, index, array) {
			if(value.destroyed)
				value.onDestroy();
			return !value.destroyed;
		});
	}

	// Render all entities
	render() {
		this.tilemap.render(this);
		for(const renderLayer of this.renderOrder) {
			if(renderLayer == "lighting"
			&& this.lightmap !== undefined) { // Manually render the lightmap at lighting layer
				this.lightmap.render(this);
			}
			for(const entity of this.entities) { // I know that this could be made into less lines, but it's more readable ;)
				if(entity.renderer === null
				|| entity.renderer === undefined) {
					entity.render(this);
				} else if(entity.renderer.layer == renderLayer) {
					entity.render(this);
				}
			}
		}
	}
}

// extras/animations.js
// A data class for storing information about animations
class Animation {
	constructor(id = "default", frames = [], frameDuration = 0, dontInterrupt = false) {
		this.id = id;
		this.frames = frames;
		this.frameDuration = frameDuration;
		this.dontInterrupt = dontInterrupt;
	}
}

// A component for handling Animations
class Animator extends Component {
	constructor(entity, animations = [], currentAnimation = 0) {
		super(entity);
		this.animations = animations;
		this.currentAnimation = currentAnimation;
		this.timer = 0;
		this.currentFrameIndex = 0;
		this.dontInterrupt = false;
	}

	update(level) {
		this.timer -= deltaTime;
		if(this.timer <= 0) {
			// Reset the timer
			this.timer = this.animations[this.currentAnimation].frameDuration;
			this.currentFrameIndex += 1;
			// Make sure the frame index isn't out of bounds
			if(this.currentFrameIndex >= this.animations[this.currentAnimation].frames.length) {
				// This means the animation is finished, so reset
				if(this.dontInterrupt) {
					this.dontInterrupt = false;
					this.currentFrameIndex -= 1;
				} else
					this.currentFrameIndex = 0;
			}
		}
	}

	changeAnimation(id) {
		// If it's playing an Animation that isn't allowed to be interrupted, don't change animations
		if(this.dontInterrupt)
			return;
		for(var i = 0; i < this.animations.length; i++) {
			if(this.animations[i].id == id) {
				this.currentAnimation = i;
				this.timer = 0;
				this.currentFrameIndex = 0;
				this.dontInterrupt = this.animations[i];
			}
		}
	}

	getFrame() {
		// Return the current character that should be rendered
		return this.animations[this.currentAnimation].frames[this.currentFrameIndex];
	}
}

// extras/stats.js
// Basically just keeps track of a number, and gives functions for changing it
class Stat extends Component {
	constructor(entity, minValue = 0, startValue = 4, maxValue = 4) {
		super(entity);
		this.minValue = minValue;
		this.value = startValue;
		this.maxValue = maxValue;
	}

	clamp() {
		// Clamp the value (inclusive)
		this.value = clamp(this.minValue, this.value, this.maxValue);
	}

	add(amount) {
		// Add amount to value and clamp it
		this.value += amount;
		this.clamp();
	}

	subtract(amount) {
		this.value -= amount;
		this.clamp();
	}
}

// A basic component for keeping track of health
class HealthStat extends Stat {
	constructor(entity, minValue = 0, startValue = 4, maxValue = 4) {
		super(entity, minValue, startValue, maxValue);
	}

	// Heal the Entity
	heal(amount) {
		this.add(amount);
	}

	// Damage the Entity
	damage(amount) {
		// This function damages the Entity, then returns if the Entity went to down minValue
		this.subtract(amount);
		return this.value <= this.minValue;
	}
}

// A basic component for keeping track of Magic (or Mana)
class MagicStat extends Stat {
	constructor(entity, minValue = 0, startValue = 4, maxValue = 4) {
		super(entity, minValue, startValue, maxValue);
	}

	give(amount) {
		this.add(amount);
	}

	use(amount) {
		// Let's say, that this function is called whenever the player uses a spell.
		// So, you pass the spell cost into this function, and if the Entity has enough
		// magic to use the spell, it returns true, else returns false
		if(this.value - amount < this.minValue)
			return false;
		this.subtract(amount);
		return true;
	}
}

// extras/rect.js
// Just a simple data class for rectangle collisions, and math
class Rect {
	constructor(position = vZero(), size = vOne()) {
		this.position = position;
		this.size = size;
	}

	// Return the center of the rect (You should probably round this for your tile based games)
	center() {
		return this.position.plus(this.size.multipliedBy(0.5));
	}

	top() { return this.position.y; }
	bottom() { return this.position.y + this.size.y; }
	left() { return this.position.x; }
	right() { return this.position.x + this.size.x; }

	// Simple AABB (Axis-aligned Bounding-box) overlap collisions
	overlaps(other) {
		return this.left() < other.right()
			&& this.right() > other.left()
			&& this.top() < other.bottom()
			&& this.bottom() > other.top();
	}
}

// extras/map.js
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

// extras/camera.js
// Preferably, don't instance this just use the CAMERA global
class Camera extends Entity {
	constructor(id = "camera", position = vZero(), tags = ["camera"], target = undefined, smoothing = 1) {
		super(id, position, tags);
		this.target = target;
		this.smoothing = smoothing;
	}

	update(level) {
		// Make sure there is a target before lerping to that position
		if(this.target !== undefined)
			this.position.lerpTo(this.target.position, this.smoothing);
	}

	// Helper functions for getting the boundaries
	top() { return this.position.y; }
	bottom() { return this.position.y + SCREEN_HEIGHT; }
	left() { return this.position.x; }
	right() { return this.position.x + SCREEN_WIDTH; }

	// Check if the tile position is in the view of the camera
	tileInView(x, y) {
		return y * TILE_SIZE >= this.top()
			&& y * TILE_SIZE < this.bottom()
			&& x * TILE_SIZE >= this.left()
			&& x * TILE_SIZE < this.right();
	}
}

const CAMERA = new Camera();

