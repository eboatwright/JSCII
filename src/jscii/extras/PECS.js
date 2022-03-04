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