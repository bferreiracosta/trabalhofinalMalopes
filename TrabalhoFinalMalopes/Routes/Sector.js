//
const express = require('express');
const _ = require('lodash');
const sectorRoutes = express.Router();

// Authentication

const Authenticate = require('./../Middleware/Authenticate');

// Models

const {Sector} = require('./../Models/Sector');

// Routes

sectorRoutes.post('/', Authenticate, async (req, res) => {
    const body = _.pick(req.body, ['name', '_idResponsible']);
    _.set(body, '_idUser', req.user._id);
    const sector = new Sector(body);

    try {
        const sectorResponse = await sector.save();
        if(sectorResponse != null) {
            res.status(200).send(sectorResponse);
        }
    } catch(e) {
        res.status(400).send(e);
    }
});

sectorRoutes.patch('/:id', Authenticate, async (req, res) => {
    const id = req.params.id;
    const body = _.pick(req.body, ['name', '_idResponsible']);

    try {
        const sectorResponse = await Sector.findOneAndUpdate({ _id: id }, { $set: body });
        if(sectorResponse != null) {
            res.status(200).send(sectorResponse);
        }
    } catch(e) {
        res.status(400).send(e);
    }
});

sectorRoutes.get('/', Authenticate, async (req, res) => {
    try {
        const sectors = await Sector.find({ _idUser: req.user._id });
        if (sectors != null) {
            res.status(200).send(sectors);
        }
    } catch (e) {
        res.status(400).send(e);
    }
});

sectorRoutes.get('/:id', Authenticate, async (req, res) => {
    const id = req.params.id;
    try {
        const sector = await Sector.findById(id);
        if(sector != null) {
            res.status(200).send(sector);
        }
    } catch(e) {
        res.status(400).send(e);
    }
});

sectorRoutes.delete('/:id', Authenticate, async (req, res) => {
    const id = req.params.id;
    try {
        const sector = await Sector.findOneAndRemove({ _id: id });
        if(sector != null) {
            res.status(200).send(sector);
        }
    } catch(e) {
        res.status(400).send(e);
    }
});

module.exports = {sectorRoutes};