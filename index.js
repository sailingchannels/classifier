const restify = require("restify");
const lookup = require("./lookup");

// init server
const server = restify.createServer();

server.post("/classify", (req, res, next) => {
	res.send(req.body);
	return next();
});

// listen to port 8080
server.listen(8080, function() {
	console.log("%s listening at %s", server.name, server.url);
});
