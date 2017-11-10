const mongoClient = require("mongodb").MongoClient;
const axios = require("axios");
const async = require("async");
const youtubeSearch = require("youtube-search");
const config = require("./config");

// ENVIRONMENT
const TAG = "dev";

var mongodbDatabase = "sailing-channels";
var mongodbHost = TAG === "dev" ? "localhost" : "mongo";

// Use connect method to connect to the server
mongoClient.connect(
	"mongodb://" + mongodbHost + ":27017/" + mongodbDatabase,
	(err, db) => {
		// find all channel description
		db
			.collection("channels")
			.find({})
			.project({
				description: 1
			})
			.toArray((err, channels) => {
				// loop channels
				async.each(
					channels,
					(channel, callback) => {
						// push to learn classifier
						axios
							.post("http://127.0.0.1:8080/learn", {
								classifier: "sailing",
								category: "sailing",
								text: channel.description
							})
							.then(function(response) {
								console.log(channel._id);
								return callback();
							})
							.catch(function(err) {
								return callback(err);
							});
					},
					err => {
						console.log(err);
						db.close();
					}
				);
			});
	}
);

const nonSailingSearchTerms = [
	"cars",
	"games",
	"racing",
	"garden",
	"lifestyle",
	"school",
	"politics",
	"vegan",
	"food",
	"baking",
	"planes",
	"vacation",
	"holiday",
	"usa",
	"gaming",
	"nature",
	"beer",
	"books",
	"literature"
];

nonSailingSearchTerms.forEach(term => {
	var opts = {
		maxResults: 50,
		key: config.ytAPIKey
	};

	youtubeSearch(term, opts, function(err, results) {
		if (err) return console.log(err);

		async.each(
			results,
			(channel, callback) => {
				// push to learn classifier
				axios
					.post("http://127.0.0.1:8080/learn", {
						classifier: "sailing",
						category: "non-sailing",
						text: channel.description
					})
					.then(function(response) {
						console.log(channel.channelId);
						return callback();
					})
					.catch(function(err) {
						return callback(err);
					});
			},
			err => {
				console.log(err);
				db.close();
			}
		);
	});
});
