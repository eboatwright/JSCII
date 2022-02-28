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

function randomRange(min, max) {
	return Math.random() * (max - min) + min;
}

function tileInScreen() {
	// TODO
}