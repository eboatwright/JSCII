// TODO

class Action {
	constructor(entity) {
		this.entity = entity;
	}

	perform() {}
}

class MoveAction extends Action {
	constructor(entity, direction) {
		super(entity);
		this.direction = direction;
	}

	perform() {
		this.entity.position += direction;
		if(this.entity.collides())
			this.entity.position -= direction;
	}
}