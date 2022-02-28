class Vector2 {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	add(other) {
		this.x += other.x;
		this.y += other.y;
	}

	plus(other) {
		return vector2(this.x + other.x, this.y + other.y);
	}

	subtract(other) {
		this.x -= other.x;
		this.y -= other.y;
	}

	minus(other) {
		return vector2(this.x - other.x, this.y - other.y);
	}

	multiply(other) {
		this.x *= other.x;
		this.y *= other.y;
	}

	multipliedBy(other) {
		return new Vector2(this.x * other.x, this.y * other.y);
	}

	divide(other) {
		this.x /= other.x;
		this.y /= other.y;
	}

	dividedBy(other) {
		return vector2(this.x / other.x, this.y / other.y);
	}

	magnitude() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	normalized() {
		var magnitude = this.magnitude();
		if(magnitude > 0)
			return this.dividedBy(magnitude);
		return VZERO;
	}

	normalize() {
		const normalized = this.normalized();
		this.x = normalized.x;
		this.y = normalized.y;
	}

	lerp(to, smoothing) {
		return vector2(lerp(this.x, to.x, smoothing), lerp(this.y, to.y, smoothing));
	}

	lerpTo(to, smoothing) {
		const value = this.lerp(to, smoothing);
		this.x = value.x;
		this.y = value.y;
	}

	distanceBetween(other) {
		return this.minus(other).magnitude();
	}
}

function vector2(x, y) {
	return new Vector2(x, y);
}

function vZero() { return vector2(0, 0); }
function vOne() { return vector2(1, 1); }
function vUp() { return vector2(0, -1); }
function vDown() { return vector2(0, 1); }
function vLeft() { return vector2(-1, 0); }
function vRight() { return vector2(1, 0); }