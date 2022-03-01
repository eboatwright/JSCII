class Level {
	constructor(renderOrder = ["default"], tilemap = new Tilemap(), lightmap = new Lightmap()) {
		this.renderOrder = renderOrder;
		this.tilemap = tilemap;
		this.lightmap = lightmap;
		this.entities = [];
	}

	addEntity(entity) {
		this.entities.push(entity);
	}

	init() {
		this.tilemap.init();
		for(var entity of this.entities)
			entity.init();
		this.lightmap.init();
	}

	update() {
		this.tilemap.update();
		for(var entity of this.entities)
			entity.update();
		this.lightmap.update();

		this.entities = this.entities.filter(function(value, index, array) {
			if(value.destroyed)
				value.onDestroy();
			return !value.destroyed;
		});
	}

	render() {
		this.tilemap.render();
		for(const renderLayer of this.renderOrder)
			for(const entity of this.entities)
				if(entity.renderer !== null
				&& entity.renderer !== undefined
				&& entity.renderer.layer == renderLayer)
					entity.render();
		this.lightmap.render();
	}
}