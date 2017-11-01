"use strict";

// imports
const { Classifier } = require("../classifier");

// LOOKUP
describe("classifier", () => {
	const classifier = new Classifier("test");

	it("should prepare an input string into tokenizer lookup indized", done => {
		var result = classifier.prepare("I love sailing more than you do!");
		(result.length > 0).should.equal(true);
		return done();
	});

	it("should train an new input to an output category", done => {
		classifier.train("I love sailing", 1);
		return done();
	});

	it("should train an second input to an output category", done => {
		classifier.train("Playing the guitar is fun", 0);
		return done();
	});

	it("should classify a new input to a certain output category", done => {
		var result = classifier.classify("True sailing is dead.");
		(result[0] > -1).should.equal(true);
		(result[1] > -1).should.equal(true);
		return done();
	});

	it("should save the network into a file", done => {
		classifier.save(err => {
			(err === null).should.equal(true);
			return done();
		});
	});

	it("should load the network from a file", done => {
		classifier.load(err => {
			(err === null).should.equal(true);
			return done();
		});
	});

	it("should classify another new input to a certain output category", done => {
		var result = classifier.classify("Guitar picks are expensive.");
		(result[0] > -1).should.equal(true);
		(result[1] > -1).should.equal(true);
		return done();
	});
});
