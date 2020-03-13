const express = require('express');

const actionRouter = require('./actions/actionRouter');
const projectRouter = require('./projects/projectRouter');

const server = express();
server.use(express.json());

server.use("/api/actions", actionRouter);
server.use("/api/projects", projectRouter);


server.get('/', (req, res) => {
    res.send(`<h2>Lets write some code!</h2>`);
});

module.exports = server;