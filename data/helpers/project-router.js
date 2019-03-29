const express = require('express');
const proDb = require('./projectModel');

const proRouter = express.Router();


proRouter.get('/', (req, res) => {
    proDb
    .get()
    .then(projects => {
        res.status(200).json(projects);
    })
    .catch(error => {
        res.status(500).json({ error: "The project information could not be retrieved"})
    })
})

proRouter.post('/', (req, res) => {
    const { name, description } = req.body;
    const newProject = req.body;

    if (name === undefined || name === "" || description === undefined || description === "") {
        res.status(400).json({ errorMessage: "Please provide a name and description"})
    } else {
        proDb
        .insert(newProject)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(error => {
            res.status(500).json({ error: "There was an error while saving this project"})
        })
    }
})

proRouter.get('/:id', (req, res) => {
    const { id } = req.params;

    proDb
    .get(id)
    .then(project => {
            res.status(200).json(project);
    })
    .catch(error => {
        res.status(500).json({ error: "The project info could not be retrieved"})
    })
})

proRouter.delete('/:id', (req, res) => {
    const { id } = req.params;

    proDb
    .remove(id)
    .then(removed => {
        if(removed > 0) {
            res.status(200).json(removed);
        } else {
            res.status(404).json({ message: "The project with the specified ID does not exist"})
        }
    })
    .catch(error => {
        res.status(500).json({ error: "Server could not find project..."})
    })
})

proRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, description} = req.body;
    const newProject = req.body;

    if (name === undefined || name === "" || description === undefined || description === "") {
        res.status(400).json({ errorMessage: "Please provide a name and description"})
    } else {
        proDb
        .update(id, newProject)
        .then(created => {
            if(created !== null) {
                res.status(200).json(created);
            } else {
                res.status(404).json({ message: "The project with the specified ID does not exist"})
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The project info could not be updated"})
        })
    }
})

proRouter.get('/:id/actions', (req,res) => {
    const { id } = req.params;

    proDb
    .getProjectActions(id)
    .then(pActions => {
        res.status(200).json(pActions);
    })
    .catch(error => {
        res.status(500).json({ error: "Project actions not found..."})
    })
})





module.exports = proRouter;