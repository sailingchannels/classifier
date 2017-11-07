const restify = require("restify");
const { Classifier } = require("./classifier");

// init server
const server = restify.createServer();
var classifiers = {};

server.get("/", (req, res, next) => {
	res.send("Sailing-Channels.com Classifier v1.0.0");
});

// LEARN
server.post("/learn", (req, res, next) => {
	if (
		!req.body ||
		!req.body.text ||
		!req.body.category ||
		!req.body.classfier
	) {
		res.status(400);
		return next();
	}

	const name = req.body.classifier;

	// create new classifier
	if (!(name in classifiers)) {
		classifiers[name] = new Classifier(name);
	}

	// learn some data
	classifiers[name].learn(req.body.text, req.body.category);

	res.send({ success: true });
	return next();
});

// CATEGORIZE
server.post("/categorize", (req, res, next) => {
	if (!req.body || !req.body.text) {
		res.status(400);
		return next();
	}

	// create new classifier
	if (!(req.body.classifier in classifiers)) {
		res.status(500);
		return next();
	}

	res.send({
		category: classifier.categorize(req.body.text)
	});

	return next();
});

// listen to port 8080
server.listen(8080, function() {
	console.log("%s listening at %s", server.name, server.url);
});

// save the classifier data in 5 minute intervalls to file
setInterval(() => {
	for (var name in classifiers) {
		classifiers[name].save();
	}
}, 1000 * 60 * 5);
