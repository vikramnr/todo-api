const express = require('express');
const bodyParser = require('body-parser');

const {
    mongoose
} = require('./db/mongoose');
const {
    User
} = require('./models/user');
const {
    Todo
} = require('./models/todo');

const app = express();
app.use(bodyParser.json());

app.get('/todos',(req,res) => {
    Todo.find({}).then((todos) =>{
        res.send(todos)
    },(e) => {
        res.status(400).send(e);
    })
})

app.post('/todos', (req, res) => {
    var newtodo = new Todo({
        text: req.body.text
    })

    newtodo.save().then((doc) => {
        res.send(doc)
    }, (e) => {
        res.status(400).send(e)
    });
})

app.listen('3000', () => {
    console.log(`server connected to port 3000`);
})

module.exports = {
    app
};