const expect = require('expect');
const request = require('supertest');

const {
    app
} = require('./../server');
const {
    Todo
} = require('./../models/todo');

beforeEach((done) => {
    Todo.remove({}).then(() => {
        done()
    }, (e) => {
        done(e);
    })
});


describe('POST /todos', () => {
    it('should create a new todo', (done) => {
            var text = 'test TODO text';
            request(app).post('/todos').send({
                    text
                }).expect(200).expect((res) => expect(res.body.text).toBe(text))
                .end((err, res) => {
                    if (err) return done(err);
                    Todo.find().then((todo) => {
                        expect(todo.length).toBe(1);
                        expect(todo[0].text).toBe(text);
                        done()
                    }).catch(e => done(e));
                });
        }),
        it('should fail with empty text object', (done) => {
            request(app).post('/todos').send({}).expect(400).end((err, res) => {
                if(err) return done(err);
            });

            Todo.find({}).then((todos) => {
                expect(todos.length).toBe(0);
                done();
            }).catch((er) => done(er));
        })

});