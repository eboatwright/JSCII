// PECS stands for Pseudo-ECS :)

class Entity {
	constructor(position = vZero()) {
		this.position = position;
		this.destroyed = false;
	}

	destroy() {
		this.destroyed = true;
	}

	init() {}
	update() {}
	render() {}
}

class Component {
	constructor(entity) {
		this.entity = entity
	}

	init() {
		throw new Error("Cannot init an empty Component! You must extend this class");
	}

	update() {
		throw new Error("Cannot update an empty Component! You must extend this class");
	}

	render() {
		throw new Error("Cannot render an empty Component! You must extend this class");
	}
}

class Renderer extends Component {
	constructor(entity, layer = "default", fgColor = WHITE) {
		super(entity);
		this.layer = layer;
		this.fgColor = fgColor;
	}

	render() {
		throw new Error("Cannot render an empty renderer! You must extend this class");
	}
}

class CharRenderer extends Renderer {
	constructor(entity, layer = "default", char = QUESTION, fgColor = WHITE, bgColor = BLACK) {
		super(entity, layer, fgColor);
		this.char = char;
		this.bgColor = bgColor;
	}

	render() {
		FONT.renderChar(this.char, this.entity.position.x, this.entity.position.y, this.fgColor, this.bgColor);
	}
}