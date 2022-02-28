class Level {
	constructor(tilemap = new Tilemap()) {
		this.tilemap = tilemap;
		this.entities = [];
		this.entities.push(tilemap);
	}

	addEntity(entity) {
		this.entities.push(entity);
	}

	init() {
		for(var entity of this.entities)
			entity.init();
	}

	update() {
		for(var entity of this.entities)
			entity.update();

		this.entities = this.entities.filter(function(value, index, array) {
			if(value.destroyed)
				value.onDestroy();
			return !value.destroyed;
		});
	}

	render() {
		for(var entity of this.entities)
			entity.render();
	}
}