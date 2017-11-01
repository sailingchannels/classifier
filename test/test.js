"use strict";

// imports
const { Lookup } = require("../lookup");

// LOOKUP
describe("lookup", () => {
	const lookup = new Lookup();

	it("should clear the lookup index", done => {
		lookup.clear();

		true.should.equal(true);
		return done();
	});

	it("should add a string to the lookup index", done => {
		var idx = lookup.add("Test");
		idx.should.equal(2);
		return done();
	});

	it("should add another string to the lookup index", done => {
		var idx = lookup.add("Test2");
		idx.should.equal(3);
		return done();
	});

	it("should add the first teststring again and not increment the counter", done => {
		var idx = lookup.add("Test");
		idx.should.equal(2);
		return done();
	});

	it("should add another string to the lookup index", done => {
		var idx = lookup.add("Test3");
		idx.should.equal(4);
		return done();
	});

	it("should return the increment lookup index of the second test string", done => {
		var idx = lookup.get("Test2");
		idx.should.equal(3);
		return done();
	});

	it("should return null, since the input has not been stored in the lookup index", done => {
		var idx = lookup.get("abc");
		(idx === null).should.equal(true);
		return done();
	});

	it("should save the current state of the lookup index to a file", done => {
		lookup.save("test.dat", err => {
			(err === null).should.equal(true);
			return done();
		});
	});

	it("should load the current state of the lookup index from a file", done => {
		lookup.clear();
		lookup.load("test.dat", err => {
			(err === null).should.equal(true);
			return done();
		});
	});

	it("should return the increment lookup index of the second test string", done => {
		var idx = lookup.get("Test2");
		idx.should.equal(3);
		return done();
	});
});
