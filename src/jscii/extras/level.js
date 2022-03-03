class Level {
	constructor(renderOrder = ["default", "lighting"], tilemap = new Tilemap(), lightmap = undefined) {
		this.renderOrder = renderOrder;
		this.tilemap = tilemap;
		this.lightmap = lightmap;
		this.entities = [];
	}

	addEntity(entity) {
		this.entities.push(entity);
	}

	getEntityById(id) {
		for(const entity of this.entities)
			if(entity.id == id)
				return entity;
		throw new Error("There is no Entity with the id: " + tag);
	}

	getEntityWithTag(tag) {
		for(const entity of this.entities)
			if(entity.tags.includes(tag))
				return entity;
		throw new Error("There is no Entity with the tag: " + tag);
	}

	getEntitiesWithTag(tag) {
		var entities = [];
		for(const entity of this.entities)
			if(entity.tags.includes(tag))
				entities.push(entity);
		return entities;
	}

	isEntityAtPosition(position) {
		for(const entity of this.entities)
			if(entity.position == position)
				return true;
		return false;
	}

	getEntityAtPosition(position) {
		if(!this.isEntityAtPosition(position))
			return null;
		for(const entity of this.entities)
			if(entity.position == position)
				return entity;
		return null;
	}

	getEntitiesAtPosition(position) {
		if(!this.isEntityAtPosition(position))
			return null;
		var entities = [];
		for(const entity of this.entities)
			if(entity.position == position)
				entities.push(entity);
		return entities;
	}

	init() {
		this.tilemap.init(this);
		for(var entity of this.entities)
			entity.init(this);
		if(this.lightmap !== undefined)
			this.lightmap.init(this);
	}

	update() {
		this.tilemap.update(this);
		for(var entity of this.entities)
			entity.update(this);

		this.entities = this.entities.filter(function(value, index, array) {
			if(value.destroyed)
				value.onDestroy();
			return !value.destroyed;
		});
	}

	render() {
		this.tilemap.render(this);
		for(const renderLayer of this.renderOrder) {
			if(renderLayer == "lighting"
			&& this.lightmap !== undefined)
				this.lightmap.render(this);
			for(const entity of this.entities)
				if(entity.renderer !== null
				&& entity.renderer !== undefined
				&& entity.renderer.layer == renderLayer)
					entity.render(this);
		}
	}
}