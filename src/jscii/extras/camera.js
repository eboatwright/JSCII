class Camera extends Entity {
	constructor(position = VZERO) {
		super(position);
	}

	top() { return this.position.y; }
	bottom() { return this.position.y + SCREEN_HEIGHT; }
	left() { return this.position.x; }
	right() { return this.position.x + SCREEN_WIDTH; }

	tileInView(x, y) {
		return y * TILE_SIZE >= this.top()
			&& y * TILE_SIZE < this.bottom()
			&& x * TILE_SIZE >= this.left()
			&& x * TILE_SIZE < this.right();
	}
}

const CAMERA = new Camera();