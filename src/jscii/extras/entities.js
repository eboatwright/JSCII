class Door extends Entity {
	constructor(position = vZero()) {
		super("door", position, ["solid", "door", "openable"]);
		this.renderer = new CharRenderer(this, "default", RIGHT_VERTICAL_LINE_3, MID_BROWN, DARK_BROWN);
	}

	render(level) {
		this.renderer.render(level);
	}
}