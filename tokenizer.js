// TOKENIZER
exports.Tokenizer = class {
	constructor() {}

	// TOKENIZE
	tokenize(input, minLength = null) {
		// sanitizing
		input = input.trim();
		input = input.toLowerCase();
		input = input.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

		// tokanize by whitespace
		var splitted = input.split(" ");

		// if min length is set, filter out words that are smaller
		if (minLength) {
			splitted = splitted.filter(s => {
				return s.length >= minLength;
			});
		}

		return splitted;
	}
};
