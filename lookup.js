const msgpack = require("msgpack");
const fs = require("fs");

// LOOKUP
exports.Lookup = class {
	constructor(name) {
		this.dict = {};
		this.inc = 0;
		this.name = name;
	}

	// ADD
	add(input) {
		// if the input has already been stored, return the increment number
		if (this.dict[input]) return this.dict[input];

		// not yet stored, store with new increment
		this.inc++;
		this.dict[input] = this.inc;
		return this.inc;
	}

	// CLEAR
	clear() {
		// reset the whole lookup index
		this.dict = {};
		this.inc = 0;
	}

	// GET
	get(input) {
		return this.dict[input] ? this.dict[input] : null;
	}

	// SAVE
	save(callback) {
		// create a messagepack buffer
		var data = msgpack.pack({
			dict: this.dict,
			inc: this.inc
		});

		// store the data into a filename
		fs.writeFile("lookup-" + this.name + ".dat", data, callback);
	}

	// LOAD
	load(callback) {
		// read the stored data file
		fs.readFile("lookup-" + this.name + ".dat", (err, data) => {
			if (err) return callback(err);

			var d = msgpack.unpack(data);

			this.dict = d.dict;
			this.inc = d.inc;

			return callback(null);
		});
	}
};
