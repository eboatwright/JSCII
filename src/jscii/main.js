var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var lastFrame = new Date().getTime();
var initialized = false;

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
	if(!initialized
	&& init()) {
		initialized = true;
	}

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

window.requestAnimationFrame(backendTick);