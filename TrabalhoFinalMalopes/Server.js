
// Start Configurations
require('./Config/Config');
require('./Config/Database');

// Constants
const express = require('express');
const bodyParser = require('body-parser');
const { userRoutes } = require('./Routes/User');
const { productRoutes } = require('./Routes/Product');
const { categoryRoutes } = require('./Routes/Category');
const { sectorRoutes } = require('./Routes/Sector');
const { responsibleRoutes } = require('./Routes/Responsible');

// Variables
var app = express();
var port = process.env.PORT;

// Middlewares
app.use(express.static(__dirname + '/Public/Views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/users', userRoutes);
app.use('/product', productRoutes);
app.use('/category', categoryRoutes);
app.use('/sector', sectorRoutes);
app.use('/responsible', responsibleRoutes);


// Start Server
app.listen(port, () => {
    console.log('Server running in port => ' + port);
});

module.exports = {app};