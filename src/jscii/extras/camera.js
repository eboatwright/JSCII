// Preferably, don't instance this just use the CAMERA global
class Camera extends Entity {
	constructor(id = "camera", position = vZero(), tags = ["camera"], target = undefined, smoothing = 1) {
		super(id, position, tags);
		this.target = target;
		this.smoothing = smoothing;
	}

	update(level) {
		// Make sure there is a target before lerping to that position
		if(this.target !== undefined)
			this.position.lerpTo(this.target.position, this.smoothing);
	}

	// Helper functions for getting the boundaries
	top() { return this.position.y; }
	bottom() { return this.position.y + SCREEN_HEIGHT; }
	left() { return this.position.x; }
	right() { return this.position.x + SCREEN_WIDTH; }

	// Check if the tile position is in the view of the camera
	tileInView(x, y) {
		return y * TILE_SIZE >= this.top()
			&& y * TILE_SIZE < this.bottom()
			&& x * TILE_SIZE >= this.left()
			&& x * TILE_SIZE < this.right();
	}
}

const CAMERA = new Camera();