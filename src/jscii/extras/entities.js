// A simple Entity that the world generator can use for doors!
// It has the right tags, so that if you use MoveAction, then you can open it and you can't run through it
class Door extends Entity {
	constructor(position = vZero()) {
		super("door", position, ["solid", "door", "openable"]);
		this.renderer = new CharRenderer(this, "default", RIGHT_VERTICAL_LINE_3, MID_BROWN, DARK_BROWN);
	}

	render(level) {
		this.renderer.render(level);
	}
}

// A class for rendering a 2d array
class TwoDArray extends Entity {
	constructor(id = "2dArray", position = vZero(), array = [], fgColor = WHITE, bgColor = BLACK, layer = "ui", tags = ["2dArray"]) {
		super(id, position, tags);
		this.renderer = new TwoDArrayRenderer(this, layer, array, fgColor, bgColor);
	}

	render(level) {
		this.renderer.render(level);
	}
}