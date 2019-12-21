var env = process.env.NODE_ENV || 'development';

if(env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/todoApp';
} else if(env === 'test') {
  process.env.port = 8080;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/todoAppTest';
}
