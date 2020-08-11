const express = require("express");
const morgan = require("morgan");
const welcomeRouter = require("./welcome/welcome-router");
const usersRouter = require("./users/users-router");
const logger = require("./middleware/logger");
// const deny = require("./middleware/deny");
const server = express();
const port = 4000;

server.use(express.json());
// Install the Morgan middleware using the "combined" format
// server.use(morgan("combined"));
// mimick the functionality of Morgan with custom middleware
// server.use(deny());
server.use(logger());


server.use(welcomeRouter);
server.use(usersRouter);

server.use((err, req, res, next) => {
	console.log(err)

	return res.status(500).json({
		message: "Oops, something went wrong!",
	})
})

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})
