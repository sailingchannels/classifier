"use strict";

// imports
const { Lookup } = require("../lookup");

// LOOKUP
describe("lookup", () => {
	const lookup = new Lookup("test");

	it("should clear the lookup index", done => {
		lookup.clear();

		true.should.equal(true);
		return done();
	});

	it("should add a string to the lookup index", done => {
		var idx = lookup.add("Test");
		idx.should.equal(1);
		return done();
	});

	it("should add another string to the lookup index", done => {
		var idx = lookup.add("Test2");
		idx.should.equal(2);
		return done();
	});

	it("should add the first teststring again and not increment the counter", done => {
		var idx = lookup.add("Test");
		idx.should.equal(1);
		return done();
	});

	it("should add another string to the lookup index", done => {
		var idx = lookup.add("Test3");
		idx.should.equal(3);
		return done();
	});

	it("should return the increment lookup index of the second test string", done => {
		var idx = lookup.get("Test2");
		idx.should.equal(2);
		return done();
	});

	it("should return null, since the input has not been stored in the lookup index", done => {
		var idx = lookup.get("abc");
		(idx === null).should.equal(true);
		return done();
	});

	it("should save the current state of the lookup index to a file", done => {
		lookup.save(err => {
			(err === null).should.equal(true);
			return done();
		});
	});

	it("should load the current state of the lookup index from a file", done => {
		lookup.clear();
		lookup.load(err => {
			(err === null).should.equal(true);
			return done();
		});
	});

	it("should return the increment lookup index of the second test string", done => {
		var idx = lookup.get("Test2");
		idx.should.equal(2);
		return done();
	});

	it("should generate an array of lookup table indizes for an array of words", done => {
		lookup.clear();

		var result = ["This", "world", "is", "amazing", "is", "it?"].map(t => {
			return lookup.add(t);
		});

		result.length.should.equal(6);
		result[0].should.equal(1);
		result[1].should.equal(2);
		result[2].should.equal(3);
		result[3].should.equal(4);
		result[4].should.equal(3);
		result[5].should.equal(5);
		return done();
	});
});
