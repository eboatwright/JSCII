const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
var lastFrame = new Date().getTime();
var deltaTime = 0;
var initialized = false;

window.onresize = function() {
	canvas.width = SCREEN_WIDTH * SCREEN_SCALE;
	canvas.height = SCREEN_HEIGHT * SCREEN_SCALE;
	context.imageSmoothingEnabled = false;
	context.scale(SCREEN_SCALE, SCREEN_SCALE);
}
window.onresize();

canvas.onclick = canvas.ontouchstart = () => {
    canvas.requestFullscreen();
};

function init() {}
function update() {}
function render() {}

function backendUpdate() {
	if(!initialized
	&& init()) {
		initialized = true;
	}

	update();
	updateKeys();
}

function backendRender() {
	context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
	render();
}

function backendTick() {
	// Note: this '/ 60' doesn't mean that JavaScript runs at 60 FPS.
	// 		It actually runs at ~30 most of the time, so this doesn't mean that
	//		deltaTime will equal 1
	deltaTime = (new Date().getTime() - lastFrame) / 60;

	backendUpdate();
	backendRender();

	lastFrame = new Date().getTime();

	window.requestAnimationFrame(backendTick);
}

window.requestAnimationFrame(backendTick);