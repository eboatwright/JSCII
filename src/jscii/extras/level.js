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
			if(entity.position.x == position.x
			&& entity.position.y == position.y)
				return true;
		return false;
	}

	// Returns the Entity at this position
	getEntityAtPosition(position) {
		if(!this.isEntityAtPosition(position))
			return null;
		for(const entity of this.entities)
			if(entity.position.x == position.x
			&& entity.position.y == position.y)
				return entity;
		return null;
	}

	// Returns all the Entities at this position
	getEntitiesAtPosition(position) {
		if(!this.isEntityAtPosition(position))
			return [];
		var entities = [];
		for(const entity of this.entities)
			if(entity.position.x == position.x
			&& entity.position.y == position.y)
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
				value.onDestroy(this);
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