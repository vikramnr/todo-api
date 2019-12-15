const {
    mongoose
} = require('./../server/db/mongoose');
const {
    User
} = require('./../server/models/user');
const {
    ObjectID
} = require('mongodb');
var id = new ObjectID();

if (!ObjectID.isValid(id)) {
    console.log('Invalid Id')
}
User.find({
    _id: id
}).then((todos) => {
    if(todos.length===0) console.log('No users found')
    console.log(todos);
}).catch(e => console.log(e.message));

User.findOne({
    _id: id
}).then((todo) => {
    if(!todo) console.log('No user with given id')
    console.log(todo);
}).catch(e => console.log(e.message));

User.findById(id).then((todo) => {
    if(!todo) console.log('No user with given id')
    console.log(todo);
}).catch(e => console.log(e.message));



// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log(todos);
// }).catch(e => console.log(e.message));

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log(todo);
// }).catch(e => console.log(e.message));

// Todo.findById(id).then((todo) => {
//     console.log(todo);
// }).catch(e => console.log(e.message));