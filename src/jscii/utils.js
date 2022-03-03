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

function randomIndex(array) {
	return Math.floor(randomRange(0, array.length));
}

function randomInArray(array) {
	return array[randomIndex(array)];
}

function flipCoin() {
	return randomRange(0, 2) == 0;
}

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