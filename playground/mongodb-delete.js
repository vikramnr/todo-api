const {
    MongoClient,
    ObjectID
} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) return console.log(err);
    console.log('Connected to mongodb server');
    const db = client.db('TodoApp');
    db.collection('Users').findOneAndDelete({
        _id: new ObjectID("5de3bac45bce310974f00f6c")
    }).then((data) => {
        console.log(data.lastErrorObject + ' have been deleted');
        console.log(`Status is ${data.ok}`);
        console.log(JSON.stringify(data.value,undefined,2));
    }, (err) => {
        console.log(err);
    })
    client.close();
})

// db.collection('Todos').deleteOne({
//     text: "Find me"
// }).then((data) => {
//     console.log(data.result.n);
//     console.log(data.result.ok)
// }, (err) => {
//     console.log(err);
// })
// db.collection('Todos').findOneAndDelete({text:'Find me'}).then((data) => {
//     console.log(data);
// },(err) => {
//     console.log(err);
// })    