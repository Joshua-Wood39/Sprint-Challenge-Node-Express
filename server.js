const express = require('express');
const proRouter = require('./data/helpers/project-router');
const actRouter = require('./data/helpers/action-router');
const cors = require('cors');

const server = express();
server.use(express.json());
server.use(cors());

server.get('/', (req,res) => {
    res.send(`
        <h1>Josh's Node-Express Sprint Challenge</h1>
        <p>There can be only one</>
    `)
})

server.use('/api/projects', proRouter);
server.use('/api/actions', actRouter)

module.exports = server;