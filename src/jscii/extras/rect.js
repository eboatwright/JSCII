class Rect {
	constructor(position = vZero(), size = vOne()) {
		this.position = position;
		this.size = size;
	}

	center() {
		return this.position.plus(this.size.multipliedBy(0.5));
	}

	top() { return this.position.y; }
	bottom() { return this.position.y + this.size.y; }
	left() { return this.position.x; }
	right() { return this.position.x + this.size.x; }

	overlaps(other) {
		return this.left() < other.right()
			&& this.right() > other.left()
			&& this.top() < other.bottom()
			&& this.bottom() > other.top();
	}
}