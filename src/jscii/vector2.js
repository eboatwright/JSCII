class Vector2 {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	add(other) {
		if(other.constructor.name == "Vector2") {
			this.x += other.x;
			this.y += other.y;
		} else {
			this.x += other;
			this.y += other;
		}
	}

	plus(other) {
		if(other.constructor.name == "Vector2")
			return vector2(this.x + other.x, this.y + other.y);
		return vector2(this.x + other, this.y + other);
	}

	subtract(other) {
		if(other.constructor.name == "Vector2") {
			this.x -= other.x;
			this.y -= other.y;
		} else {
			this.x -= other;
			this.y -= other;
		}
	}

	minus(other) {
		if(other.constructor.name == "Vector2")
			return vector2(this.x - other.x, this.y - other.y);
		return vector2(this.x - other, this.y - other);
	}

	multiply(other) {
		if(other.constructor.name == "Vector2") {
			this.x *= other.x;
			this.y *= other.y;
		} else {
			this.x *= other;
			this.y *= other;
		}
	}

	multipliedBy(other) {
		if(other.constructor.name == "Vector2")
			return vector2(this.x * other.x, this.y * other.y);
		return vector2(this.x * other, this.y * other);
	}

	divide(other) {
		if(other.constructor.name == "Vector2") {
			this.x /= other.x;
			this.y /= other.y;
		} else {
			this.x /= other;
			this.y /= other;
		}
	}

	dividedBy(other) {
		if(other.constructor.name == "Vector2")
			return vector2(this.x / other.x, this.y / other.y);
		return vector2(this.x / other, this.y / other);
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

	round() {
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
	}

	rounded() {
		return vector2(Math.round(this.x), Math.round(this.y));
	}

	floor() {
		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);
	}

	floored() {
		return vector2(Math.floor(this.x), Math.floor(this.y));
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