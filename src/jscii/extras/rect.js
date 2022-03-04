// Just a simple data class for rectangle collisions, and math
class Rect {
	constructor(position = vZero(), size = vOne()) {
		this.position = position;
		this.size = size;
	}

	// Return the center of the rect (You should probably round this for your tile based games)
	center() {
		return this.position.plus(this.size.multipliedBy(0.5));
	}

	top() { return this.position.y; }
	bottom() { return this.position.y + this.size.y; }
	left() { return this.position.x; }
	right() { return this.position.x + this.size.x; }

	// Simple AABB (Axis-aligned Bounding-box) overlap collisions
	overlaps(other) {
		return this.left() < other.right()
			&& this.right() > other.left()
			&& this.top() < other.bottom()
			&& this.bottom() > other.top();
	}
}