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

function init2DArray(width, height, value = 0) {
	var result = [];
	for(var y = 0; y < height; y++) {
		var row = [];
		for(var x = 0; x < width; x++)
			row.push(value);
		result.push(row);
	}
	return result;
}

function copyVar(variable) {
	return Object.assign({}, variable);
}

function copyArray(array) {
	var result = [];
	for(const value of array)
		result.push(copyVar(value));
	return result;
}