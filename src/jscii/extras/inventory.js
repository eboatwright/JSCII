// An Entity that holds everything you need to know about an item (at the moment ;))
class Item extends Entity {
	// The name, is what shows up in the inventory screen
	constructor(id = "item", position = vZero(), name = "?", charRenderer = undefined, tags = ["item"]) {
		super(id, position, tags);
		this.name = name;
		this.renderer = charRenderer;
		this.renderer.entity = this;
		if(charRenderer === undefined) // If no charRenderer as defined, make a default one
			this.renderer = new CharRenderer(this);
	}

	update(level) {
	}

	render(level) {
		this.renderer.render(level);
	}
}

// A very simple data class for holding an item Entity, and how many the player has
class ItemSlot {
	constructor(item, amount) {
		this.item = item;
		this.amount = amount;
	}
}

class Inventory extends Component {
	constructor(entity, maxItemSlots = 10) {
		super(entity);
		this.maxItemSlots = maxItemSlots;
		this.inventory = [];
	}

	hasItem(itemName) {
		for(const item of this.inventory)
			if(item.item.name == itemName)
				return true;
		return false;
	}

	// Returns the index of the item with the name specified, returns -1 if not found
	getItemIndex(itemName) {
		for(var i = 0; i < this.inventory.length; i++)
			if(this.inventory[i].item.name == itemName)
				return i;
		return -1;
	}

	// Pickup an Item Entity
	pickup(itemEntity) {
		if(itemEntity.destoryed)
			return;

		if(this.hasItem(itemEntity.name))
			this.inventory[this.getItemIndex(itemEntity.name)].amount += 1;
		else {
			if(this.inventory.length >= this.maxItemSlots)
				return "full";
			this.inventory.push(new ItemSlot(itemEntity, 1));
		}

		itemEntity.destroy();
	}

	// Drop the item, and return the Item Entity
	drop(itemName) {
		if(!this.hasItem(itemName))
			return null;

		const index = this.getItemIndex(itemName);
		this.inventory[index].amount -= 1;

		var item = this.inventory[index].item;
		item.destroyed = false;

		if(this.inventory[index].amount <= 0)
			this.inventory.splice(index, 1);

		return item;
	}

	// Drop the item corresponding to the index, and return the Item Entity
	dropIndex(index) {
		return this.drop(this.inventory[index].item.name);
	}

	// Basically a format() function for the Inventory
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

	// Formats everything into a marked string
	getMarked() {
		var result = "";
		for(var i = 0; i < this.inventory.length; i++) {
			result += `${ALPHABET[i]}: ${this.inventory[i].amount} ${this.inventory[i].item.name}`;
			if(this.inventory[i].amount > 1)
				result += "S";
			result += "\n";
		}
		return result;
	}
}