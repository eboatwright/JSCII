class NameGenerator {
	constructor() {}

	generate() {
		throw new Error("cannot generate with empty NameGenerator You must extend this class");
	}
}

class PersonNameGenerator extends NameGenerator {
	constructor(firstNames, firstHalfLastName, secondHalfLastName) {
		super();
		this.firstNames = firstNames;
		this.firstHalfLastName = firstHalfLastName;
		this.secondHalfLastName = secondHalfLastName;
	}

	generate() {
		var result = "";

		result += randomInArray(this.firstNames);
		result += " ";
		result += randomInArray(this.firstHalfLastName);
		result += randomInArray(this.secondHalfLastName);

		return result;
	}
}