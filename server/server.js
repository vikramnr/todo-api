var env = process.env.NODE_ENV;
const express = require('express');
const bodyParser = require('body-parser');
const {
    ObjectID
} = require('mongodb');
const {
    mongoose
} = require('./db/mongoose');
const _ = require('lodash');
const {
    User
} = require('./models/user');
const {
    Todo
} = require('./models/todo');

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.get('/',(req, res) => {
    res.redirect('/todos')
});

app.get('/todos', (req, res) => {
    Todo.find({}).then((todos) => {
        res.send({
            todos
        })
    }, (e) => {
        res.status(400).send(e);
    })
})

app.get('/todos/:id', (req, res) => {
    let id = req.params.id

    if (!ObjectID.isValid(id)) {
        return res.status(404).send({
            message: 'Invalid Id'
        })
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send({
                message: 'Nothing with given id'
            })
        }
        res.send({
            todo
        })
    }, (e) => {
        return res.status(404).send(e);
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
});

app.delete('/todos/:id', (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(400).send();
        }
        return res.status(200).send({
            todo
        });
    }).catch((e) => {
        res.status(400).send();
    });
});

app.patch('/todos/:id', (req, res) => {
    let id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) return res.status(404).send();

    if (_.isBoolean(body.completed) && body.completed) {
        if (body.completed === true) {
            body.completedAt = new Date().getTime();
        }
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {
        $set: body
    }, {
        new: true
    }).then((todo) => {
        if (!todo) return res.status(404).send();
        res.send({
            todo
        });
    }).catch(e => res.status(404).send());
});

app.listen(port, () => {
    console.log(`server connected to port ${port}`);
})

module.exports = {
    app
};
