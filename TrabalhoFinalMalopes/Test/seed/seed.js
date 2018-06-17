const {User} = require('./../../Models/User');

const jwt = require("jsonwebtoken");
const {ObjectID} = require('mongodb');

const idUseOne = new ObjectID();
const idUserTwo = new ObjectID();

const users = [{
    _id: idUseOne,
    name: "testando",
    email: "teste@example.com",
    password: "123456",
    address: {
        cep: "30140000",
        city: "Uberlandia",
        street: "Rua dos labios",
        neighborhood: "Centro",
        state: "Minas Gerais",
        number: 123
    },
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: idUseOne, access: 'auth'}, process.env.JWT_SECRET).toString()
    }]
},{
    _id: idUserTwo,
    name: "testando1",
    email: "teste1@example.com",
    password: "1234567",
    address: {
        cep: "30142000",
        city: "Prata",
        street: "Rua dos popos",
        neighborhood: "Edna",
        state: "Minas Gerais",
        number: 113
    },
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: idUserTwo, access: 'auth'}, process.env.JWT_SECRET).toString()
    }]
}];

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo]);
    }).then(() => done());
};

module.exports = {
    populateUsers,
    users
};