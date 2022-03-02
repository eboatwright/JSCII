var keys = [];
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