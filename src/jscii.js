// constants.js
const SCREEN_WIDTH = 480;
const SCREEN_HEIGHT = 300;
const SCREEN_SCALE = 2;

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

const COLORS = [BLACK, WHITE, DARK_BROWN, LIGHT_BLUE, PINK, MID_DARK_GREEN, DARK_BLUE, LIGHT_GREEN, MID_BROWN, DARK_GREEN, LIGHT_BROWN, DARK_GRAY, MID_GRAY, MID_LIGHT_GREEN, MID_BLUE, LIGHT_GRAY];

// input.js
var keys = [];
var keysLast = [];

window.addEventListener("keydown", function(event) {
	keys[event.key] = true;
});

window.addEventListener("keyup", function(event) {
	keys[event.key] = false;
});

function updateKeys() {
	keysLast = Object.assign({}, keys);
}

function keyDown(key) {
	return keys[key];
}

function keyUp(key) {
	return !keys[key];
}

function keyJustDown(key) {
	return keys[key] && !keysLast[key];
}

function keyJustUp(key) {
	return !keys[key] && keysLast[key];
}

// utils.js
function loadImage(src) {
	var image = new Image();
	image.src = src;
	return image;
}

function sin(time, intensity, distance) {
	return Math.sin(time * intensity) * distance;
}

function lerp(start, end, smoothing) {
	return (1 - smoothing) * start + smoothing * end;
}

// font.js
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
		default: return char;
	}
}

class Font {
	constructor() {
		this.image = loadImage("res/commodore64_petscii.png");
	}

	renderChar(char, x, y, fgColor, bgColor, inverted) {
		context.fillStyle = bgColor;
		context.fillRect(x * 8, y * 8, 8, 8);
		context.drawImage(this.image, toCharIndex(char) * 9, COLORS.indexOf(fgColor) * 9, 8, 8, x * 8, y * 8, 8, 8);
	}

	renderText(text, x, y, fgColor, bgColor, inverted) {
		text = text.toUpperCase();
		for(var i = 0; i < text.length; i++)
			this.renderChar(text[i], x + i, y, fgColor, bgColor, inverted);
	}
}

const FONT = new Font();

// vector2.js
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

// PECS.js


// main.js
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var lastFrame = new Date().getTime();

window.onresize = function() {
	canvas.width = SCREEN_WIDTH * SCREEN_SCALE;
	canvas.height = SCREEN_HEIGHT * SCREEN_SCALE;
	context.imageSmoothingEnabled = false;
	context.scale(SCREEN_SCALE, SCREEN_SCALE);
}
window.onresize();

function init() {}
function update(deltaTime) {}
function render() {}

function backendUpdate(deltaTime) {
	update(deltaTime);
	updateKeys();
}

function backendRender() {
	context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
	render();
}

function backendTick() {
	const deltaTime = (new Date().getTime() - lastFrame) / 60;

	backendUpdate(deltaTime);
	backendRender();

	lastFrame = new Date().getTime();

	window.requestAnimationFrame(backendTick);
}

init();
window.requestAnimationFrame(backendTick);

