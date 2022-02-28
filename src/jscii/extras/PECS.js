// PECS stands for Pseudo-ECS :)

class Entity {
	constructor(position = VZERO) {
		this.position = position;
		this.components = [];
	}

	add(component) {
		this.components.push(component);
		return this;
	}

	update() {
	}

	render() {
	}
}

class Renderer {
	constructor() {
	}
}

var player = new Entity()
		.add(new Renderer());