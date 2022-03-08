// This one's big

// A class for Vector calculation on a 2 dimensional plane
class Vector2 {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	// Add the other's values to these values
	add(other) {
		// Check if other is a vector2
		if(other.constructor.name == "Vector2") {
			// If so add the x and y
			this.x += other.x;
			this.y += other.y;
		} else {
			// If not, try to add it like a number
			this.x += other;
			this.y += other;
		}
	}

	// *Returns* the value, instead of adding to the vector2
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

	// Return the magnitude / length of the vector
	magnitude() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	// Return the normalized vector instead of modifying the current vector
	normalized() {
		var magnitude = this.magnitude();
		if(magnitude > 0)
			return this.dividedBy(magnitude);
		return VZERO;
	}

	// Normalize the vector (Make x + y equal one (most of the time (math is weird)))
	normalize() {
		const normalized = this.normalized();
		this.x = normalized.x;
		this.y = normalized.y;
	}

	// Return the lerped vector
	lerp(to, smoothing) {
		return vector2(lerp(this.x, to.x, smoothing), lerp(this.y, to.y, smoothing));
	}

	// Lerp to "to" with the smoothing
	lerpTo(to, smoothing) {
		const value = this.lerp(to, smoothing);
		this.x = value.x;
		this.y = value.y;
	}

	// Get the distance between two vectors
	distanceBetween(other) {
		return this.minus(other).magnitude();
	}

	// Round this vector
	round() {
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
	}

	// Return this vector but rounded
	rounded() {
		return vector2(Math.round(this.x), Math.round(this.y));
	}

	// Floor this vector
	floor() {
		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);
	}

	// Return this vector floored
	floored() {
		return vector2(Math.floor(this.x), Math.floor(this.y));
	}

	// Copy the vector
	copy() {
		return vector2(this.x, this.y);
	}

	// Sometimes you need this, for == (idk js is weird)
	equals(other) {
		return this.x == other.x
			&& this.y == other.y;
	}
}

// A helper function for making vectors
function vector2(x, y) {
	return new Vector2(x, y);
}

// Helper functions for making directional vectors
function vZero() { return vector2(0, 0); }
function vOne() { return vector2(1, 1); }
function vUp() { return vector2(0, -1); }
function vDown() { return vector2(0, 1); }
function vLeft() { return vector2(-1, 0); }
function vRight() { return vector2(1, 0); }