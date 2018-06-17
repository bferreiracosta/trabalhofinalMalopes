//
const express = require('express');
const _ = require('lodash');
const productRoutes = express.Router();

// Authentication

const Authenticate = require('./../Middleware/Authenticate');

// Models

const {Product} = require('./../Models/Product');

// Routes

productRoutes.post('/', Authenticate, async (req, res) => {
    const body = _.pick(req.body, ['name', '_idCategory', 'quantity']);
    _.set(body, '_idUser', req.user._id);
    const product = new Product(body);

    try {
        const productResponse = await product.save();
        if(productResponse != null) {
            res.status(200).send(productResponse);
        }
    } catch(e) {
        res.status(400).send(e);
    }
});

productRoutes.patch('/:id', Authenticate, async (req, res) => {
    const id = req.params.id;
    const body = _.pick(req.body, ['name', '_idCategory', 'quantity']);

    try {
        const productResponse = await Product.findOneAndUpdate({ _id: id }, { $set: body });
        if(productResponse != null) {
            res.status(200).send(productResponse);
        }
    } catch(e) {
        res.status(400).send(e);
    }
});

productRoutes.get('/', Authenticate, async (req, res) => {
    try {
        const products = await Product.find({ _idUser: req.user._id });
        if (products != null) {
            res.status(200).send(products);
        }
    } catch (e) {
        res.status(400).send(e);
    }
});

productRoutes.get('/:id', Authenticate, async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findById(id);
        if(product != null) {
            res.status(200).send(product);
        }
    } catch(e) {
        res.status(400).send(e);
    }
});

productRoutes.delete('/:id', Authenticate, async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findOneAndRemove({ _id: id });
        if(product != null) {
            res.status(200).send(product);
        }
    } catch(e) {
        res.status(400).send(e);
    }
});

module.exports = {productRoutes};