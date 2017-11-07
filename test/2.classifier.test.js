"use strict";

// imports
const { Classifier } = require("../classifier");

var classifier;

// LOOKUP
describe("classifier", () => {
	it("initialize a classifier", done => {
		classifier = new Classifier("test");

		classifier.should.not.equal(null);
		return done();
	});

	it("should train and categorize correctly", done => {
		classifier.learn("I sail a yacht with wind", "sailing");
		classifier.learn(
			"She was circumnavigating the work in her 40 foot sailing ketch yacht",
			"sailing"
		);
		classifier.learn("Vacuum cleaners are always broken", "non-sailing");

		var cat = classifier.categorize("Sailing yachts need wind");
		cat.should.equal("sailing");

		var cat2 = classifier.categorize("hagning the broken laundry");
		cat2.should.equal("non-sailing");

		return done();
	});

	it("should write the trained model to a zip file", done => {
		classifier.save((err, success) => {
			success.should.equal(true);

			return done();
		});
	});

	it("should load the trained model from a zip file", done => {
		classifier.load();
		return done();
	});

	it("should still categorize correctly", done => {
		var cat = classifier.categorize("Sailing yachts need wind");
		cat.should.equal("sailing");

		var cat2 = classifier.categorize("hagning the broken laundry");
		cat2.should.equal("non-sailing");

		return done();
	});
});
