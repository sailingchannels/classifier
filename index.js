const restify = require("restify");

// init server
const server = restify.createServer();

// LEARN
server.post("/learn", (req, res, next) => {
	if (!req.body || !req.body.text || !req.body.category) {
		res.status(400);
		return next();
	}

	res.send({ err: null });
	return next();
});

// CATEGORIZE
server.post("/categorize", (req, res, next) => {
	return next();
});

// listen to port 8080
server.listen(8080, function() {
	console.log("%s listening at %s", server.name, server.url);
});
