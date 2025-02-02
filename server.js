'use strict';
const express = require('express');
const server = express();
const logger = require('./middleware/logger.js');
// const getBrowser = require('./middleware/getBrowser.js');
const handle500 = require('./routeErrorHandlers/500.js');
const handle404 = require('./routeErrorHandlers/404.js');
const peopleRoutes = require('./routes/people.route.js');
const coldRoutes = require('./routes/cold.route.js');
const hotRoutes = require('./routes/hot.route.js');

// start function that will be used by index
function start(port) {
  server.listen(port, () => console.log(`I am listening on port ${port}`));
}

// if we want the mw applied to every route we put it on top
server.use(logger);

// GLOBAL Express MW
server.use(express.json());

// write some test that will check the / route for "hello world"
server.get('/', (req, res) => res.send('Hello World'));

server.use(peopleRoutes);
server.use(coldRoutes);
server.use(hotRoutes);

server.use('*', handle404);
server.use(handle500);

module.exports = { server, start };