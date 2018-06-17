//
const express = require('express');
const _ = require('lodash');
const userRoutes = express.Router();

// Authentication

const Authenticate = require('./../Middleware/Authenticate');

// Models

const {User} = require('./../Models/User');

// Routes

userRoutes.post('/', async (req, res) => {
    const body = _.pick(req.body, ['name', 'email', 'password', 'address']);
    const user = new User(body);

    try {
        const newUser = await user.save();
        const token = await newUser.generateAuthToken();
        res.header('x-auth', token).send(user);
    } catch(e) {
        res.status(400).send(e);
    }
});

userRoutes.get('/me', Authenticate, (req, res) => {
    res.send(req.user);
});

userRoutes.post('/login', async (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    
    try {
        const user = await User.findByCredentials(body.email, body.password);
        const token = await user.generateAuthToken();
        res.header('x-auth', token).send(user);
    } catch(e) {
        res.status(400).send({
            "message": "Usuario ou senha invalidos",
            "code": 9001
        });
    }
});

userRoutes.delete('/me/token', Authenticate, async (req, res) => {
    try {
        await req.user.removeToken(req.token);
        res.status(200).send();
    } catch(e) {
        res.status(400).send(e);
    }
});

module.exports = {userRoutes};