// Basically just keeps track of a number, and gives functions for changing it
class Stat extends Component {
	constructor(entity, minValue = 0, startValue = 4, maxValue = 4) {
		super(entity);
		this.minValue = minValue;
		this.value = startValue;
		this.maxValue = maxValue;
	}

	clamp() {
		// Clamp the value (inclusive)
		this.value = clamp(this.minValue, this.value, this.maxValue);
	}

	add(amount) {
		// Add amount to value and clamp it
		this.value += amount;
		this.clamp();
	}

	subtract(amount) {
		this.value -= amount;
		this.clamp();
	}
}

// A basic component for keeping track of health
class HealthStat extends Stat {
	constructor(entity, minValue = 0, startValue = 4, maxValue = 4) {
		super(entity, minValue, startValue, maxValue);
	}

	// Heal the Entity
	heal(amount) {
		this.add(amount);
	}

	// Damage the Entity
	damage(amount) {
		// This function damages the Entity, then returns if the Entity went to down minValue
		this.subtract(amount);
		return this.value <= this.minValue;
	}
}

// A basic component for keeping track of Magic (or Mana)
class MagicStat extends Stat {
	constructor(entity, minValue = 0, startValue = 4, maxValue = 4) {
		super(entity, minValue, startValue, maxValue);
	}

	give(amount) {
		this.add(amount);
	}

	use(amount) {
		// Let's say, that this function is called whenever the player uses a spell.
		// So, you pass the spell cost into this function, and if the Entity has enough
		// magic to use the spell, it returns true, else returns false
		if(this.value - amount < this.minValue)
			return false;
		this.subtract(amount);
		return true;
	}
}