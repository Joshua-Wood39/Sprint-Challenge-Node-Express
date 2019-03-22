const express = require('express');




const server = express();
server.use(express.json());

server.get('/', (req,res) => {
    res.send(`
        <h1>Josh's Node-Express Sprint Challenge</h1>
        <p>There can be only one</>
    `)
})




module.exports = server;