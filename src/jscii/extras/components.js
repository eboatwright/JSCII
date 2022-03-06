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