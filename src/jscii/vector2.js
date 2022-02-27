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
		return new Vector2(this.x + other.x, this.y + other.y);
	}

	subtract(other) {
		this.x -= other.x;
		this.y -= other.y;
	}

	minus(other) {
		return new Vector2(this.x - other.x, this.y - other.y);
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
		return new Vector2(this.x / other.x, this.y / other.y);
	}

	magnitude() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	normalized() {
		var magnitude = this.magnitude();
		if(magnitude > 0) {
			return this.dividedBy(magnitude);
		}
	}

	normalize() {
		const normalized = this.normalized();
		this.x = normalized.x;
		this.y = normalized.y;
	}

	lerp(to, smoothing) {
		return new Vector2(lerp(this.x, to.x, smoothing), lerp(this.y, to.y, smoothing));
	}

	lerpTo(to, smoothing) {
		const value = this.lerp(to, smoothing);
		this.x = value.x;
		this.y = value.y;
	}
}

const VZERO = new Vector2(0, 0);
const VONE = new Vector2(1, 1);
const VUP = new Vector2(0, -1);
const VDOWN = new Vector2(0, 1);
const VLEFT = new Vector2(-1, 0);
const VRIGHT = new Vector2(1, 0);