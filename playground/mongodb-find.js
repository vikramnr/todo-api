const {
    MongoClient,
    ObjectID
} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) return console.log(err);
    console.log('Connected to mongodb server');
    const db = client.db('TodoApp');
    db.collection('Users').find({
        name: 'Kansh'
    }).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log(err);
    })
    client.close();
})

//db.collection('Todos').find({_id: new ObjectID('5de3b90d8e5a201be4cc0158')}).toArray().then((docs) =>{
//     console.log('Docs were found..');
//     console.log( JSON.stringify(docs,undefined,2));
// },(err) => {
//     if(err) return console.log(err);
// });
// db.collection('Todos').find({}).count().then((count) => {
//     console.log(`Todos count is ${count}`);
// },(err) =>{
//     console.log(err);
// })