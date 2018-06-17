//
const express = require('express');
const _ = require('lodash');
const responsibleRoutes = express.Router();

// Authentication

const Authenticate = require('./../Middleware/Authenticate');

// Models

const {Responsible} = require('./../Models/Responsible');

// Routes

responsibleRoutes.post('/', Authenticate, async (req, res) => {
    const body = _.pick(req.body, ['name', 'cpf', 'phone']);
    _.set(body, '_idUser', req.user._id);
    const responsible = new Responsible(body);

    try {
        const responsibleResponse = await responsible.save();
        if(responsibleResponse != null) {
            res.status(200).send(responsibleResponse);
        }
    } catch(e) {
        res.status(400).send(e);
    }
});

responsibleRoutes.patch('/:id', Authenticate, async (req, res) => {
    const id = req.params.id;
    const body = _.pick(req.body, ['name', 'cpf', 'phone']);

    try {
        const responsibleResponse = await Responsible.findOneAndUpdate({ _id: id }, { $set: body });
        if(responsibleResponse != null) {
            res.status(200).send(responsibleResponse);
        }
    } catch(e) {
        res.status(400).send(e);
    }
});

responsibleRoutes.get('/', Authenticate, async (req, res) => {
    try {
        const responsibles = await Responsible.find({ _idUser: req.user._id });
        if (responsibles != null) {
            res.status(200).send(responsibles);
        }
    } catch (e) {
        res.status(400).send(e);
    }
});

responsibleRoutes.get('/:id', Authenticate, async (req, res) => {
    const id = req.params.id;
    try {
        const responsible = await Responsible.findById(id);
        if(responsible != null) {
            res.status(200).send(responsible);
        }
    } catch(e) {
        res.status(400).send(e);
    }
});

responsibleRoutes.delete('/:id', Authenticate, async (req, res) => {
    const id = req.params.id;
    try {
        const responsible = await Responsible.findOneAndRemove({ _id: id });
        if(responsible != null) {
            res.status(200).send(responsible);
        }
    } catch(e) {
        res.status(400).send(e);
    }
});

module.exports = {responsibleRoutes};