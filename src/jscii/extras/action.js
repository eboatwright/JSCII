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
		// Before we move, we check if there are any other entities at the position
		for(const entity of this.level.getEntitiesAtPosition(this.entity.position.plus(this.direction))) {
			// If there is an Entity with the solid tag, we can't move there
			if(entity.hasTag("solid")) {
				// If the Entity has health, then damage it
				if(entity.health !== undefined)
					entity.health.damage(1);
				// Then return because we can't go inside of a solid Entity
				return;
			}
		}

		// Move the entity
		this.entity.position.add(this.direction);

		// Check if there's a solid tile in the way
		if(this.level.tilemap.getTile(this.entity.position.x, this.entity.position.y).tags.includes("solid"))
			// Move back out of the tile
			this.entity.position.subtract(this.direction);
	}
}