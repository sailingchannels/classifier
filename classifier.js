const { Lookup } = require("./lookup");
const { Tokenizer } = require("./tokenizer");
const synaptic = require("synaptic");
const msgpack = require("msgpack");
const fs = require("fs");

// use namespaces
const Network = synaptic.Network;
const Trainer = synaptic.Trainer;
const Architect = synaptic.Architect;

// CLASSIFIER
exports.Classifier = class {
	constructor(name) {
		this.lookup = new Lookup(name);
		this.tokenizer = new Tokenizer();

		this.name = name;
		this.network = new Architect.Perceptron(20, 30, 2);
		this.trainer = new Trainer(this.network);
	}

	// LOAD
	load(callback) {
		// read the stored data file
		fs.readFile("classifier-" + this.name + ".dat", (err, data) => {
			if (err) return callback(err);

			var raw = msgpack.unpack(data);

			// load NN
			this.network = Network.fromJSON(raw);

			return callback(null);
		});
	}

	// SAVE
	save(callback) {
		// serialize NN
		var raw = this.network.toJSON();

		// create a messagepack buffer
		var data = msgpack.pack(raw);

		// store the data into a filename
		fs.writeFile("classifier-" + this.name + ".dat", data, callback);
	}

	// PREPARE
	prepare(input) {
		// tokenize input string
		var tokens = this.tokenizer.tokenize(input, 4);

		// map each string to a lookup index
		return tokens.map(t => {
			return this.lookup.add(t);
		});
	}

	// TRAIN
	train(input, category) {
		// train the NN
		this.trainer.train([
			{
				input: this.prepare(input),
				output: [category]
			}
		]);
	}

	// CLASSIFY
	classify(input) {
		return this.network.activate(this.prepare(input));
	}
};
