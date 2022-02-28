// PECS stands for Pseudo-ECS :)

class Entity {
	constructor(position = vZero()) {
		this.position = position;
	}

	update() {}
	render() {}
}

class Component {
	constructor(entity) {
		this.entity = entity
	}

	update() {
		throw new Error("Cannot spawn an empty Component!");
	}

	render() {
		throw new Error("Cannot spawn an empty Component!");
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