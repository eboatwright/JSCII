// This is a very simple section

// Derive from this class to make your own name generator
class NameGenerator {
	constructor() {}

	generate() {
		// Throw an error if you try to use this class without deriving
		throw new Error("cannot generate with empty NameGenerator You must extend this class");
	}
}

// This class is just a *basic* name generator for generating person's names
class PersonNameGenerator extends NameGenerator {
	constructor(firstNames, firstHalfLastName, secondHalfLastName) {
		// This super() call is required by JavaScript
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