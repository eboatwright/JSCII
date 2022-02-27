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