const {
    MongoClient,
    ObjectID
} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) return console.log(err);
    console.log('Connected to mongodb server');
    const db = client.db('TodoApp');
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5de3b9960b9c0112d40b4fb0')
    }, {
        $set: {
            location: 'New York'
        },
        $inc: {
            'age': -22
        }
    }, {
        returnOriginal: false
    }).then((data) => {
        console.log(data);
    }, (err) => {
        console.log(err);
    }) 
    client.close();
})


// db.collection('Todos').findOneAndUpdate({
//     _id: new ObjectID('5de3b90d8e5a201be4cc0158'),
// }, {
//     $set: {
//         completed: true
//     }
// }, {
//     returnOriginal: false
// }).then((data) => {
//     console.log(data);
// })  