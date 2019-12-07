const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/todoApp', (err) => {
    if (err) return console.log(err);
    console.log('Connencted');
});

module.exports = {
    mongoose
};