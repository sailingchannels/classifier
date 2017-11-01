const restify = require("restify");
const lookup = require("./lookup");

// init server
const server = restify.createServer();

server.get("/hello/:name", (req, res, next) => {
	res.send("hello " + req.params.name);
	return next();
});

// listen to port 8080
server.listen(8080, function() {
	console.log("%s listening at %s", server.name, server.url);
});
