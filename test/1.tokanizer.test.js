"use strict";

// imports
const { Tokenizer } = require("../tokenizer");

// TOKANIZER
describe("tokenizer", () => {
	var tokenizer = new Tokenizer();

	it("should tokenize a simple string", done => {
		var result = tokenizer.tokenize("This is a test");

		result.length.should.equal(4);

		return done();
	});

	it("should tokenize a string and strip interpunctation", done => {
		var result = tokenizer.tokenize("This is a Test. ");

		result.length.should.equal(4);
		result[3].should.equal("test");

		return done();
	});

	it("should tokenize a string and only return words that are at least 4 chars long", done => {
		var result = tokenizer.tokenize("This is a Test. ", 4);

		result.length.should.equal(2);
		result[1].should.equal("test");

		return done();
	});
});
