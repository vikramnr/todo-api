const expect = require('expect');
const request = require('supertest');
const {
    ObjectID
} = require('mongodb');

const {
    app
} = require('./../server');
const {
    Todo
} = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'Buy dog food'
}, {
    _id: new ObjectID(),
    text: 'Buy ring for weeding'
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos').expect(200).expect((res) => {
                expect(res.body.todos.length).toBe(2);
            }).end(done);
    });
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
            var text = 'test TODO text';
            request(app).post('/todos').send({
                    text
                }).expect(200).expect((res) => expect(res.body.text).toBe(text))
                .end((err, res) => {
                    if (err) return done(err);
                    Todo.find({
                        text
                    }).then((todo) => {
                        expect(todo.length).toBe(1);
                        expect(todo[0].text).toBe(text);
                        done()
                    }).catch(e => done(e));
                });
        }),
        it('should fail with empty text object', (done) => {
            request(app).post('/todos').send({}).expect(400).end((err, res) => {
                if (err) return done(err);
            });

            Todo.find({}).then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch((er) => done(er));
        });
});

describe('POST /:id', () => {
    it('should return valid todo', (done) => {
        request(app).get(`/todos/${todos[0]._id.toHexString()}`)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done)
    })
    it('should return 404 for todo not found', (done) => {
        let id = new ObjectID().toHexString();
        request(app).get(`/todos/${id}`).expect(404).end(done)
    })
    it('should return 404 for invalid id', (done) => {
        request(app).get('/todos/a12ss').expect(404).end(done)
    })
})