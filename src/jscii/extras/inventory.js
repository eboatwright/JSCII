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

class ItemSlot {
	constructor(item, amount) {
		this.item = item;
		this.amount = amount;
	}
}

class Inventory extends Component {
	constructor(entity) {
		super(entity);
		this.inventory = [];
	}

	hasItem(itemName) {
		for(const item of this.inventory)
			if(item.item.name == itemName)
				return true;
		return false;
	}

	getItemIndex(itemName) {
		for(var i = 0; i < this.inventory.length; i++)
			if(this.inventory[i].item.name == itemName)
				return i;
		return -1;
	}

	pickup(itemEntity) {
		if(itemEntity.destoryed)
			return;

		if(this.hasItem(itemEntity.name))
			this.inventory[this.getItemIndex(itemEntity.name)].amount += 1;
		else
			this.inventory.push(new ItemSlot(itemEntity, 1));

		itemEntity.destroy();
	}

	drop(itemName) {
		if(!this.hasItem(itemName))
			return null;

		const index = this.getItemIndex(itemName);
		this.inventory[index].amount -= 1;
		if(this.inventory[index] <= 0)
			this.inventory.splice(index, 1);

		var item = this.inventory[index];
		item.destroyed = false;
		return item;
	}

	get() {
		var result = "";
		for(const slot of this.inventory) {
			result += `${slot.amount} ${slot.item.name}`;
			if(slot.amount > 1)
				result += "S";
			result += "\n";
		}
		return result;
	}
}