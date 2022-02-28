// PECS stands for Pseudo-ECS :)

class Entity {
	constructor(position = VZERO) {
		this.position = position;
	}

	update() {}
	render() {}
}

class RenderGlyph {
	constructor(glyph = QUESTION, fgColor = WHITE, bgColor = BLACK) {
		this.glyph = glyph;
		this.fgColor = fgColor;
		this.bgColor = bgColor;
	}
}