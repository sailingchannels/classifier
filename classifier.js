const msgpack = require("msgpack");
const fs = require("fs");
const bayes = require("bayes");
const zlib = require("zlib");

const { Tokenizer } = require("./tokenizer");

// CLASSIFIER
exports.Classifier = class {
	// CONSTRUCTOR
	constructor() {
		this.classifier = bayes({
			tokenizer: new Tokenizer().tokenize
		});

		// tries to load the classifier content from file
		this.load();
	}

	// LEARN
	learn(text, category) {
		this.classifier.learn(text, category);
	}

	// CATEGORIZE
	categorize(text) {
		return this.classifier.categorize(text);
	}

	// SAVE
	save(callback) {
		const json = this.classifier.toJson();
		const packed = msgpack.pack(json);

		zlib.deflate(packed, (err, zipped) => {
			fs.writeFile("classifier.msgpack.zip", zipped, "utf8", err => {
				if (err) callback(err);
				else callback(null, true);
			});
		});
	}

	// LOAD
	load(callback) {
		// if stored version of the classifer exists, load this one
		fs.readFile("classifier.msgpack.zip", (err, file) => {
			if (err || !file) return callback(err);

			// unzip content
			zlib.inflate(file, (err, unzipped) => {
				if (err) return callback(err);

				// un-msgpack the content
				const unmsgpacked = msgpack.unpack(unzipped);

				this.classifier = bayes.fromJson(unmsgpacked);
				this.classifier.tokenizer = new Tokenizer().tokenize;

				return callback(null, true);
			});
		});
	}
};
