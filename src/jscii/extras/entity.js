// JSCII's basic Entity system

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
	onDestroy(level) {}
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