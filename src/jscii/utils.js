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