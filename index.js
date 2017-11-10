const restify = require("restify");

const { Classifier } = require("./classifier");
var classifiers = {};

// init server
const server = restify.createServer();
server.use(restify.plugins.bodyParser());

server.get("/", (req, res, next) => {
	res.send("Sailing-Channels.com Classifier v1.0.0");
});

// LEARN
server.post("/learn", (req, res, next) => {
	console.log(req.body);
	if (
		!req.body ||
		!req.body.text ||
		!req.body.category ||
		!req.body.classifier
	) {
		res.status(400);
		res.send({});
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
	if (!req.body || !req.body.text || !req.body.classifier) {
		res.status(400);
		return next();
	}

	const name = req.body.classifier;

	// create new classifier
	if (!(name in classifiers)) {
		res.status(500);
		return next();
	}

	res.send({
		category: classifiers[name].categorize(req.body.text)
	});

	return next();
});

// listen to port 8080
server.listen(8080, "127.0.0.1", function() {
	console.log("%s listening at %s", server.name, server.url);
});

// save the classifier data in 5 minute intervalls to file
setInterval(() => {
	for (var name in classifiers) {
		classifiers[name].save();
	}
}, 1000 * 60 * 5);
