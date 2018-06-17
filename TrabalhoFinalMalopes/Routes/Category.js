//
const express = require('express');
const _ = require('lodash');
const categoryRoutes = express.Router();

// Authentication

const Authenticate = require('./../Middleware/Authenticate');

// Models

const {Category} = require('./../Models/Category');

// Routes

categoryRoutes.post('/', Authenticate, async (req, res) => {
    var body = _.pick(req.body, ['name', '_idSector']);
    _.set(body, '_idUser', req.user._id);
    var category = new Category(body);

    try {
        const categoryResponse = await category.save();
        if(categoryResponse != null){
            res.status(200).send(categoryResponse);
        }
    } catch(e) {
        res.status(400).send(e);
    }
});

categoryRoutes.patch('/:id', Authenticate, async (req, res) => {
    var body = _.pick(req.body, ['name', '_idSector']);

    try {
        const categoryResponse = await Category.findOneAndUpdate({ _id: id }, { $set: body });
        if(categoryResponse != null) {
            res.status(200).send(categoryResponse);
        }
    } catch(e) {
        res.status(400).send(e);
    }
});

categoryRoutes.get('/', Authenticate, async (req,res) => {
    try {
        const categorys = await Category.find({ _idUser: req.user._id });
        if (categorys != null) {
            res.status(200).send(categorys);
        }
    } catch (e) {
        res.status(400).send(e);
    }
});

categoryRoutes.get('/:id', Authenticate, async (req, res) => {
    const id = req.params.id;
    try {
        const category = await Category.findById(id);
        if(category != null) {
            res.status(200).send(category);
        }
    } catch(e) {
        res.status(400).send(e);
    }
});

categoryRoutes.delete('/:id', Authenticate, async (req,res) => {
    const id = req.params.id;
    try {
        const category = await Category.findOneAndRemove({ _id: id });
        if(category != null) {
            res.status(200).send(category);
        }
    } catch(e) {
        res.status(400).send(e);
    }
});

module.exports = {categoryRoutes};