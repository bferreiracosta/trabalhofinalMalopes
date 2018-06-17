const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../Server');
const {User} = require('./../Models/User');

const {
    populateUsers,
    users
} = require('./seed/seed');

beforeEach(populateUsers);

describe('POST /users/', () => {
    it('Criar Usuario', (done) => {
        var name = "victor freitas";
        var email = 'victorfreitas500@gmail.com';
        var password = '12345678';
        var address = {
            cep: "38140000",
            street: "234",
            neighborhood: "234",
            city: "234",
            state: "234",
            number: 123
        };

        request(app)
        .post('/users/')
        .send({name, email, password, address})
        .expect(200)
        .expect((res) => {
            expect(res.headers['x-auth']).toBeTruthy();
            expect(res.body._id).toBeTruthy();
            expect(res.body.email).toBe(email);
        })
        .end((err) => {
            if(err){
                return done(err);
            }

            User.findOne({email}).then((user) => {
               expect(user).toBeTruthy();
               done();
            }).catch((e) => done(e));
        });
    });

    it('Parametros incorretos ao criar usuario', (done) => {
        var email = "asdasd";
        var password = "asd";

        request(app)
        .post('/users/')
        .send({email, password})
        .expect(400)
        .expect((res) => {
            expect(res.headers['x-auth']).toBeFalsy();
        })
        .end((err) => {
          if(err) {
              return done(err);
          }  

          User.findOne({email}).then((user) => {
            expect(user).toBeFalsy();
            done();
          }).catch((e) => done(e));
        });
    });
});

describe('POST /users/login', () => {
    it('Logar usuario com sucesso', (done) => {

        request(app)
        .post('/users/login')
        .send({
            email: users[0].email,
            password: users[0].password
        })
        .expect(200)
        .expect((res) => {
            expect(res.headers['x-auth']).toExist();
        })
        .end((err, res) => {
            if(err){
                return done(err);
            }

            User.findById({_id: users[0]._id}).then((user) =>{
                expect(user.tokens[1]).toInclude({
                    _id: user.tokens[1]._id,
                    access: 'auth',
                    token: res.headers['x-auth']
                });
                done();
            }).catch((e) => done(e));
        });
    });

    it('Logar usuario com falha', (done) => {

        request(app)
        .post('/users/login')
        .send({
            email: '123@gmail.com',
            password: '123'
        })
        .expect(400)
        .expect((res) => {
            expect(res.headers['x-auth']).toNotExist();
        })
        .end((err, res) => {
            if(err) {
                return done(err);
            }

            done();
        });
    });
});

describe("/GET /users/me", () => {
    it('Pegar Usuario Pelo Token', (done) => {

        request(app)
        .get('/users/me')
        .set('X-Auth', users[0].tokens[0].token)
        .expect(200)
        .expect((res) => {
            expect(res.body._id).toExist();
            expect(res.body.email).toExist();
        })
        .end((err, res) => {
            if(err) { return done(err); }

            done();
        });
    });
});

describe("/GET /users/me", () => {
    it('Falha Ao Pegar Usuario Pelo Token', (done) => {

        request(app)
        .get('/users/me')
        .expect(401)
        .end((err, res) => {
            if(err) { return done(e); }

            done();
        });
    });
});

describe("/DELETE /users/me/token", () => {
    it('Invalidar O Token', (done) => {

        request(app)
        .delete('/users/me/token')
        .set('X-Auth', users[0].tokens[0].token)
        .expect(200)
        .end((err, res) => {
            if(err) { return done(err); }

            User.findById(users[0]._id).then((user) => {
                expect(user.tokens[0]).toNotExist();
            });
            done();
        });
    });
});