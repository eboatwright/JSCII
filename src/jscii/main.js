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