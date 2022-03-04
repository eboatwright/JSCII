class Stat extends Component {
	constructor(entity, minValue = 0, startValue = 4, maxValue = 4) {
		super(entity);
		this.minValue = minValue;
		this.value = startValue;
		this.maxValue = maxValue;
	}

	clamp() {
		this.value = clamp(this.minValue, this.value, this.maxValue);
	}

	add(amount) {
		this.value += amount;
		this.clamp();
	}

	subtract(amount) {
		this.value -= amount;
		this.clamp();
	}
}

class HealthStat extends Stat {
	constructor(entity, minValue = 0, startValue = 4, maxValue = 4) {
		super(entity, minValue, startValue, maxValue);
	}

	heal(amount) {
		this.add(amount);
	}

	damage(amount) {
		this.subtract(amount);
	}
}

class MagicStat extends Stat {
	constructor(entity, minValue = 0, startValue = 4, maxValue = 4) {
		super(entity, minValue, startValue, maxValue);
	}

	give(amount) {
		this.add(amount);
	}

	use(amount) {
		if(this.value - amount < this.minValue)
			return false;
		this.subtract(amount);
		return true;
	}
}