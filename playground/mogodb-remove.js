const {
    mongoose
} = require('./../server/db/mongoose');
const {
    Todo
} = require('./../server/models/todo');
const {
    ObjectID
} = require('mongodb');
var id = '5df5c5514c64a61fcc387a54';

if (!ObjectID.isValid(id)) {
    console.log('Invalid Id')
}

Todo.remove({})
    .then((todos) => {
        console.log(todos);
    }).catch(e => console.log(e.message));

// Todo.findOneAndRemove({
//     _id: id
// }).then((todo) => {
//     console.log(todo);
// }).catch(e => console.log(e.message));

// Todo.findByIdAndRemove(id).then((todo) => {
//     console.log(todo);
// }).catch(e => console.log(e.message));