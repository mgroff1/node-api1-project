// implement your API here
// implement your API here
const express = require('express');
const db = require('./data/db');

const server = express();
server.use(express.json());

server.listen(5111, () => {
    console.log(' *** listening on 5111 *** ');
});

//------POST-------

server.post('/api/users', (req, res) => {
    const userInfo = req.body;

    db.insert(userInfo)
        .then(user => {
            if (user) {
                res.status(200).json({
                    message: 'User added!',
                    user
                });
            } else {
                res.status(400).json({
                    message: 'Please provide name and bio for the user'
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                err
            });
        });
});

//--------GET---------

server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        }).catch(err => {
            res.status(500).json({
                success: false,
                err
            });
        });
});

//-------GET BY ID-------

server.get('/api/users/:id', (req, res) => {
    const {
        id
    } = req.params;

    db.findById(id)
        .then(user => {
            res.status(200).json(user);
        }).catch(err => {
            res.status(500).json({
                success: false,
                err
            });
        });
});

//-------DELETE--------

server.delete('/api/users/:id', (req, res) => {
    const {
        id
    } = req.params;

    db.remove(id)
        .then(deleted => {
            if (deleted) {
                res.status(204).end();
            } else {
                res.status(404).json({
                    success: false,
                    message: 'A user with this ID was not found'
                });
            }
        }).catch(err => {
            res.status(500).json({
                success: false,
                err
            });
        });
});

//-------PUT------

server.put('/api/users/:id', (req, res) => {
    const {
        id
    } = req.params;
    const changes = req.body;

    db.update(id, changes)
        .then(updates => {
            if (updated) {
                res.status(200).json({
                    success: true,
                    updated
                });
            } else {
                res.status(400).json({
                    message: 'Something went wrong. Double check the ID and info'
                });
            }
        }).catch(err => {
            res.status(500).json({
                message: 'he user info could not be changed',
                err
            });
        });
});