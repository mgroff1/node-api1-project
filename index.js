const express = require('express');
const cors = require('cors');
const Data = require('./data/db');

const server = express ();

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.json({ hello: "Server running"})
})

// retrieve all users
server.get('/api/users', (req, res) => {
    Data.find()
    .then(data => {
        res.status(200).json(data)
    }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    })
})

// retrieve user by id
server.get('/api/users/:id', (req, res) => {
    const {id} = req.params;
    Data.findById(id)
    .then(data => {
        if (!data) {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        } else {
            res.status(200).json(data)
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    })
})

// add new user
server.post('/api/users', (req, res) => {
    const dbInfo = req.body;

    if (!dbInfo.name || !dbInfo.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        Data.insert(dbInfo)
        .then(data => {
            res.status(201).json(data);
        }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
        })
    }
})

// delete user
server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params;

    Data.remove(id)
    .then(data => {
        if (!data) {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        } else {
            res.status(200).json(data);
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "The user could not be removed" })
    })
})

// update user
server.put('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const updatedUser = req.body;

    Data.update(id, updatedUser)
    .then(data => {
        if (!updatedUser.name || !updatedUser.bio)  {
            res.status(404).json ({ message: "The user with the specified ID does not exist." })
        } else if (!id){
            res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
        } else {
            res.status(200).json(data)
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "The user information could not be modified." })
    })
})

const port = 5000;
server.listen(port, () => console.log(`API on port ${port}`));
