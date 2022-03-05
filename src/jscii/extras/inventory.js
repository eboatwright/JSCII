// TODO: under construction! DON'T USE!!
// TODO: document me!

class Item extends Entity {
	constructor(id = "item", position = vZero(), name = "?", charRenderer = undefined, tags = ["item"]) {
		super(id, position, tags);
		this.name = name;
		this.renderer = charRenderer;
		this.renderer.entity = this;
		if(charRenderer === undefined)
			this.renderer = new CharRenderer(this);
	}

	update(level) {
	}

	render(level) {
		this.renderer.render(level);
	}
}

class Inventory extends Component {
	constructor(entity) {
		super(entity);
		this.inventory = new Map();
	}

	hasItem(itemName) {
		return this.inventory.has(itemName);
	}

	pickup(itemEntity) {
		if(itemEntity.destoryed)
			return;

		if(this.hasItem(itemEntity.name))
			this.inventory.set(itemEntity.name, this.inventory.get(itemEntity.name) + 1);
		else
			this.inventory.set(itemEntity.name, 1);

		itemEntity.destroy();
	}

	get() {
		var result = "";
		for(const data of this.inventory) {
			result += `${data[1]} ${data[0]}`;
			if(data[1] > 1)
				result += "S";
			result += "\n";
		}
		return result;
	}
}