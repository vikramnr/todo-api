const {
    MongoClient,
    ObjectID
} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) return console.log(err);
    console.log('Connected to mongodb server');
    const db = client.db('TodoApp');
    db.collection('Users').insertOne({
        name: 'Kansh',
        age: 31,
        location: 'AL'
    }, (err, result) => {
        if (err) return console.log(err);
        console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
    });
    client.close();
})