const express = require('express');
const actDb = require('./actionModel');

const actRouter = express.Router();

actRouter.get('/', (req, res) => {
    actDb
    .get()
    .then(actions => {
        res.status(200).json(actions);
    })
    .catch(error => {
        res.status(500).json({ error: "Actions info could not be retrieved"})
    })
})

actRouter.post('/', (req, res) => {
    const { project_id, description } = req.body;
    const newAction = req.body;

    if (project_id === undefined || project_id === "" || description === undefined || description === "") {
        res.status(400).json({ message: "Please provide a project-id and description"})
    } else {
        actDb
        .insert(newAction)
        .then(action => {
            res.status(201).json(action);
        })
        .catch(error => {
            res.status(500).json({ error: "There was an error while saving this action"})
        })
    }
})

actRouter.get('/:id', (req, res) => {
    const { id } = req.params;

    actDb
    .get(id)
    .then(action => {
        res.status(200).json(action);
    })
    .catch(error => {
        res.status(500).json({ error: "The info could not be retrieved (ID may not exist)"})
    })
})

actRouter.delete('/:id', (req, res) => {
    const { id } = req.params;

    actDb
    .remove(id)
    .then(removed => {
        if(removed > 0) {
            res.status(200).json(removed);
        } else {
            res.status(404).json({ message: "The action with the specified ID does not exist"})
        }
    })
    .catch(error => {
        res.status(500).json({ error: "The info could not be removed (ID may not exist)"})
    })
})

actRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    const { project_id, description } = req.body;
    const newAction = req.body;

    if( project_id === undefined || project_id === "" || description === undefined || description === "") {
        res.status(400).json({ errorMessage: "Please provide a project-id and description"})
    } else {
        actDb
        .update(id, newAction)
        .then(created => {
            if(created !== null) {
                res.status(200).json(created);
            } else {
                res.status(404).json({ message: "The action with the specified ID does not exist"})
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The action info could not be updated"})
        })
    }
})





module.exports = actRouter;