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
		throw new Error("Cannot init an empty Component!");
	}

	update() {
		throw new Error("Cannot update an empty Component!");
	}

	render() {
		throw new Error("Cannot render an empty Component!");
	}
}

class RenderChar extends Component {
	constructor(entity, char = QUESTION, fgColor = WHITE, bgColor = BLACK) {
		super(entity);
		this.char = char;
		this.fgColor = fgColor;
		this.bgColor = bgColor;
	}

	render() {
		FONT.renderChar(this.char, this.entity.position.x, this.entity.position.y, this.fgColor, this.bgColor);
	}
}