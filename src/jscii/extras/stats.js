// Basically just keeps track of a number, and gives functions for changing it
class Stat extends Component {
	constructor(entity, startValue = 4, maxValue = 4) {
		super(entity);
		this.value = startValue;
		this.maxValue = maxValue;
	}

	clamp() {
		// Clamp the value (inclusive)
		this.value = clamp(0, this.value, this.maxValue);
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
	constructor(entity, startValue = 4, maxValue = 4) {
		super(entity, startValue, maxValue);
	}

	// Heal the Entity
	heal(amount) {
		this.add(amount);
	}

	// Damage the Entity
	damage(amount) {
		// This function damages the Entity, then returns if the Entity went to down minValue
		this.subtract(amount);
		var zero = this.value <= 0;
		if(zero)
			this.onZero();
		return zero;
	}

	onZero() {}
}

// A basic component for keeping track of Magic (or Mana)
class MagicStat extends Stat {
	constructor(entity, startValue = 4, maxValue = 4) {
		super(entity, startValue, maxValue);
	}

	give(amount) {
		this.add(amount);
	}

	use(amount) {
		// Let's say, that this function is called whenever the player uses a spell.
		// So, you pass the spell cost into this function, and if the Entity has enough
		// magic to use the spell, it returns true, else returns false
		if(this.value - amount < 0)
			return false;
		this.subtract(amount);
		return true;
	}
}