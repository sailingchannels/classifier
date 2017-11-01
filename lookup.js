const msgpack = require("msgpack");
const fs = require("fs");

exports.Lookup = class {
	constructor() {
		this.dict = {};
		this.inc = 1;
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
		this.inc = 1;
	}

	// GET
	get(input) {
		return this.dict[input] ? this.dict[input] : null;
	}

	// SAVE
	save(filename, callback) {
		// create a messagepack buffer
		var data = msgpack.pack({
			dict: this.dict,
			inc: this.inc
		});

		// store the data into a filename
		fs.writeFile(filename, data, callback);
	}

	// LOAD
	load(filename, callback) {
		// read the stored data file
		fs.readFile(filename, (err, data) => {
			if (err) return callback(err);

			var d = msgpack.unpack(data);

			this.dict = d.dict;
			this.inc = d.inc;

			return callback(null);
		});
	}
};
