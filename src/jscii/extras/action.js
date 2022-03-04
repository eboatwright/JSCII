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