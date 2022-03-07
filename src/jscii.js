// constants.js
// The size of the tile (one pixel will get added between each as padding)
const TILE_SIZE = 8;

// The screen width (not scaled) in pixels
const SCREEN_WIDTH = 480;
const SCREEN_HEIGHT = 300;
// How many times the width and height will be scaled onto the screen
// Example:
// SCREEN_WIDTH = 200;
// SCREEN_HEIGHT = 100;
// so the rendered screen, will be 400x200
const SCREEN_SCALE = 2;

// All the characters of the sheet!
// You will notice, that there are some numbers missing. That is because, I removed all the duplicates (without removing them from the image)
const AT = 0;
const A = 1;
const B = 2;
const C = 3;
const D = 4;
const E = 5;
const F = 6;
const G = 7;
const H = 8;
const I = 9;
const J = 10;
const K = 11;
const L = 12;
const M = 13;
const N = 14;
const O = 15;
const P = 16;
const Q = 17;
const R = 18;
const S = 19;
const T = 20;
const U = 21;
const V = 22;
const W = 23;
const X = 24;
const Y = 25;
const Z = 26;
const LEFT_SQUARE_BRACKET = 27;
const POUND = 28;
const RIGHT_SQUARE_BRACKET = 29;
const UP_ARROW = 30;
const LEFT_ARROW = 31;
const SPACE = 32;
const EXCLAMATION = 33;
const QUOTE = 34;
const HASH = 35;
const DOLLAR = 36;
const MODULUS = 37;
const AMPERSAND = 38;
const APOSTROPHE = 39;
const LEFT_PAREN = 40;
const RIGHT_PAREN = 41;
const ASTERISK = 42;
const PLUS = 43;
const COMMA = 44;
const HYPHON = 45;
const PERIOD = 46;
const FWD_SLASH = 47;
const ZERO = 48;
const ONE = 49;
const TWO = 50;
const THREE = 51;
const FOUR = 52;
const FIVE = 53;
const SIX = 54;
const SEVEN = 55;
const EIGHT = 56;
const NINE = 57;
const COLON = 58;
const SEMICOLON = 59;
const LESS_THAN = 60;
const EQUAL = 61;
const GREATER_THAN = 62;
const QUESTION = 63;
const HORIZONTAL_LINE = 64;
const SPADE = 65;
const VERTICAL_LINE = 66;
// Duplicate of HORIZONTAL_LINE
const TOP_HORIZONTAL_LINE_1 = 68;
const TOP_HORIZONTAL_LINE_2 = 69;
const BOTTOM_HORIZONTAL_LINE_1 = 70;
const LEFT_VERTICAL_LINE_1 = 71;
const RIGHT_VERTICAL_LINE_1 = 72;
const BOTTOM_LEFT_CURVE = 73;
const TOP_RIGHT_CURVE = 74;
const TOP_LEFT_CURVE = 75;
const BOTTOM_LEFT_ANGLE = 76;
const BACK_DIAGONAL_LINE = 77;
const FORWARD_DIAGONAL_LINE = 78;
const TOP_LEFT_ANGLE = 79;
const TOP_RIGHT_ANGLE = 80;
const CIRCLE = 81;
const LOWER_VERTICAL_LINE_2 = 82;
const HEART = 83;
const LEFT_VERTICAL_LINE_2 = 84;
const BOTTOM_RIGHT_CURVE = 85;
const BIG_X = 86;
const BIG_O = 87;
const CLUB = 88;
const RIGHT_VERTICAL_LINE_2 = 89;
const DIAMOND = 90;
const BIG_PLUS = 91;
const LEFT_SIDE_CHECKER = 92;
// Duplicate of VERTICAL_LINE
const PI = 94;
const TOP_RIGHT_SLANT = 95;
// Duplicate of SPACE
const LEFT_HALF = 97;
const BOTTOM_HALF = 98;
const TOP_PIXEL = 99;
const BOTTOM_PIXEL = 100;
const LEFT_VERTICAL_LINE_3 = 101;
const CHECKER = 102;
const RIGHT_VERTICAL_LINE_3 = 103;
const BOTTOM_HALF_CHECKER = 104;
const TOP_LEFT_SLANT = 105;
// Duplicate of RIGHT_VERTICAL_LINE_3
const TOP_RIGHT_BOTTOM_PIPE = 107;
const BOTTOM_RIGHT_QUARTER = 108;
const TOP_RIGHT_PIPE = 109;
const BOTTOM_LEFT_PIPE = 110;
const BOTTOM_HORIZONTAL_LINE_3 = 111;
const BOTTOM_RIGHT_PIPE = 112;
const LEFT_TOP_RIGHT_PIPE = 113;
const LEFT_BOTTOM_RIGHT_PIPE = 114;
const LEFT_TOP_BOTTOM_PIPE = 115;
// Duplicate of LEFT_VERTICAL_LINE_3
const LEFT_THIRD = 117;
const RIGHT_THIRD = 118;
const TOP_HORIZONTAL_LINE_3 = 119;
const TOP_THIRD = 120;
const BOTTOM_THIRD = 121;
const BOTTOM_RIGHT_ANGLE = 122;
const BOTTOM_LEFT_QUARTER = 123;
const TOP_RIGHT_QUARTER = 124;
const TOP_LEFT_PIPE = 125;
const TOP_LEFT_QUARTER = 126;
const THICK_CHECKER = 127;
// They would have saved alot of memory if they hadn't duplicated so many tiles XD

// All the colors that the Commodore 64's PETSCII could render!
const BLACK = "#000000";
const WHITE = "#ffffff";
const DARK_BROWN = "#883932";
const LIGHT_BLUE = "#67b6bd";
const PINK = "#8b3f96";
const MID_DARK_GREEN = "#55a049";
const DARK_BLUE = "#40318d";
const LIGHT_GREEN = "#bfce72";
const MID_BROWN = "#8b5429";
const DARK_GREEN = "#574200";
const LIGHT_BROWN = "#b86962";
const DARK_GRAY = "#505050";
const MID_GRAY = "#787878";
const MID_LIGHT_GREEN = "#94e089";
const MID_BLUE = "#7869c4";
const LIGHT_GRAY = "#9f9f9f";

// The color order on the texture sheet
const COLORS = [BLACK, WHITE, DARK_BROWN, LIGHT_BLUE, PINK, MID_DARK_GREEN, DARK_BLUE, LIGHT_GREEN, MID_BROWN, DARK_GREEN, LIGHT_BROWN, DARK_GRAY, MID_GRAY, MID_LIGHT_GREEN, MID_BLUE, LIGHT_GRAY];

const ALPHABET = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// input.js
// This stores whether or not the key is being held down right now
var keys = [];
// This stores whether or not the key was being held *last* frame
var keysLast = [];

window.addEventListener("keydown", function(event) {
	keys[event.key] = true;
});

window.addEventListener("keyup", function(event) {
	keys[event.key] = false;
});

function updateKeys() {
	// Note: JavaScript is a little weird in it's memory management,
	// 		So I have to do this 'Object.assign({})' thing to copy the array
	//		instead of make a reference to it
	keysLast = Object.assign({}, keys);
}

// "Is the key being held *right now*"
function keyDown(key) {
	return keys[key];
}

// "Was the key held last frame?"
function keyUp(key) {
	return !keys[key];
}

// "Was the key *just* pressed this frame?"
function keyJustDown(key) {
	return keys[key] && !keysLast[key];
}

// "Was the key just released this frame?"
function keyJustUp(key) {
	return !keys[key] && keysLast[key];
}

// Checks if any of the keys given (in an array) are down
function anyDown(keysToCheck) {
	for(const key of keysToCheck)
		if(keyDown(key))
			return key;
	return null;
}

// Checks if any of the keys given (in an array) were just pressed
function anyJustDown(keysToCheck) {
	for(const key of keysToCheck)
		if(keyJustDown(key))
			return key;
	return null;
}

// Checks if any of the keys given (in an array) were just released
function anyJustUp(keysToCheck) {
	for(const key of keysToCheck)
		if(keyJustUp(key))
			return key;
	return null;
}

// utils.js
// Most of these are just helper functions

// For loading an image
function loadImage(filePath) {
	var image = new Image();
	image.src = filePath;
	return image;
}

// For making sin wave calculation easier
function sin(time, intensity, distance) {
	return Math.sin(time * intensity) * distance;
}

// Linearly interpolate (smoothly go between) start, and end with the value smoothing (0 to 1)
function lerp(start, end, smoothing) {
	return (1 - smoothing) * start + smoothing * end;
}

// Generates a random number between min and max (exclusive) (will generate with a decimal)
function randomRange(min, max) {
	return Math.random() * (max - min) + min;
}

// Return a random index of an array
function randomIndex(array) {
	return Math.floor(randomRange(0, array.length));
}

// Return a random value of an array
function randomInArray(array) {
	return array[randomIndex(array)];
}

// A function for making random choices easier (returns true or false)
function flipCoin() {
	return Math.floor(randomRange(0, 2)) == 0;
}

// Easier array initialization
function initArray(size, value = 0) {
	var result = [];
	for(var i = 0; i < size; i++)
		result.push(value);
	return result;
}

function init2DArray(width, height, value = 0) {
	var result = [];
	for(var y = 0; y < height; y++)
		result.push(initArray(width, value));
	return result;
}

// Clamp a number between a range (inclusive)
function clamp(min, value, max) {
	return Math.min(Math.max(value, min), max);
}

// font.js
// Convert all the tiles that can be conveyed with text (I might have missed some) to their indexes
function toCharIndex(char) {
	switch(char) {
		case "@": return AT;
		case "A": return A;
		case "B": return B;
		case "C": return C;
		case "D": return D;
		case "E": return E;
		case "F": return F;
		case "G": return G;
		case "H": return H;
		case "I": return I;
		case "J": return J;
		case "K": return K;
		case "L": return L;
		case "M": return M;
		case "N": return N;
		case "O": return O;
		case "P": return P;
		case "Q": return Q;
		case "R": return R;
		case "S": return S;
		case "T": return T;
		case "U": return U;
		case "V": return V;
		case "W": return W;
		case "X": return X;
		case "Y": return Y;
		case "Z": return Z;
		case "[": return LEFT_SQUARE_BRACKET;
		case "]": return RIGHT_SQUARE_BRACKET;
		case " ": return SPACE;
		case "!": return EXCLAMATION;
		case "\"": return QUOTE;
		case "#": return HASH;
		case "$": return DOLLAR;
		case "%": return MODULUS;
		case "&": return AMPERSAND;
		case "'": return APOSTROPHE;
		case "(": return LEFT_PAREN;
		case ")": return RIGHT_PAREN;
		case "*": return ASTERISK;
		case "+": return PLUS;
		case ",": return COMMA;
		case "-": return HYPHON;
		case ".": return PERIOD;
		case "/": return FWD_SLASH;
		case "\\": return BACK_DIAGONAL_LINE;
		case "0": return ZERO;
		case "1": return ONE;
		case "2": return TWO;
		case "3": return THREE;
		case "4": return FOUR;
		case "5": return FIVE;
		case "6": return SIX;
		case "7": return SEVEN;
		case "8": return EIGHT;
		case "9": return NINE;
		case ":": return COLON;
		case ";": return SEMICOLON;
		case "<": return LESS_THAN;
		case "=": return EQUAL;
		case ">": return GREATER_THAN;
		case "?": return QUESTION;
		case "|": return VERTICAL_LINE;
		default: return char;
	}
}

// You can instance your own Font class, but there is a constant named FONT that you *should* use
class Font {
	constructor() {
		this.image = loadImage("res/commodore64_petscii.png");
	}

	// Renders a single char to the screen at the position with the colors specified
	renderChar(char, x, y, fgColor, bgColor) {
		// Check if you can even see the tile
		if(!CAMERA.tileInView(x, y))
			return;
		// Set the context fill style for the background and render it
		context.fillStyle = bgColor;
		context.fillRect(x * (TILE_SIZE + 1), y * (TILE_SIZE + 1), TILE_SIZE, TILE_SIZE);
		// Render the character with 1 pixel padding and the right colors
		context.drawImage(this.image, toCharIndex(char) * (TILE_SIZE + 1), COLORS.indexOf(fgColor) * (TILE_SIZE + 1), TILE_SIZE, TILE_SIZE, x * (TILE_SIZE + 1), y * (TILE_SIZE + 1), 8, 8);
	}

	// Render a sequence of characters
	renderText(text, x, y, fgColor, bgColor) {
		text = text.toUpperCase();

		// Keep track of the x and y offsets
		var xOff = 0;
		var yOff = 0;
		for(var i = 0; i < text.length; i++) {
			if(text[i] == "\n") {
				// Reset the x offset and go to the next line
				yOff += 1;
				xOff = 0;
			} else {
				this.renderChar(text[i], x + xOff, y + yOff, fgColor, bgColor);
				xOff += 1;
			}
		}
	}

	// This is for rendering alot of characters, that can't* be conveyed with regular text.
	// (Although you can put the indexes of "regular" letters through it)
	renderArray(array, x, y, fgColor, bgColor) {
		for(var i = 0; i < array.length; i++)
			this.renderChar(array[i], x + i, y, fgColor, bgColor);
	}
}

// A constant font that you *should* use for your rendering
const FONT = new Font();

// vector2.js
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

// main.js
// Get all of the HTML stuff
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
// Used for delta time calculation
var lastFrame = new Date().getTime();
var deltaTime = 0;
// This is just for checking if the init method has been called yet
var initialized = false;

window.onresize = function() {
	// Set the canvas width to the *scaled* resolution
	canvas.width = SCREEN_WIDTH * SCREEN_SCALE;
	canvas.height = SCREEN_HEIGHT * SCREEN_SCALE;
	// Set no smoothing for pixel art
	context.imageSmoothingEnabled = false;
	context.scale(SCREEN_SCALE, SCREEN_SCALE);
}
// Call this right now, so that the resolution and scaling can get setup
window.onresize();

// When the player clicks the canvas, request fullscreen
canvas.onclick = canvas.ontouchstart = () => {
    canvas.requestFullscreen();
};

// Override these methods for your game
function init() {}
function update() {}
function render() {}

function backendUpdate() {
	update();
	// Update the keys *after* the update function
	updateKeys();
}

function backendRender() {
	// This just clears the screen
	context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
	render();
}

function backendTick() {
	// Note: this '/ 60' doesn't mean that JavaScript runs at 60 FPS.
	// 		It actually runs at ~30 most of the time, so this doesn't mean that
	//		deltaTime will equal 1
	deltaTime = (new Date().getTime() - lastFrame) / 60;

	if(initialized) {
		backendUpdate();
		backendRender();
	} else
		initialized = init();

	// For delta time calculation
	lastFrame = new Date().getTime();

	window.requestAnimationFrame(backendTick);
}

// This is JavaScript / HTML's native way of saying:
// "Run this function as soon as you can"
window.requestAnimationFrame(backendTick);

