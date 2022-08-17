// Run this script to launch the server.
// The server should run on localhost port 8000.
// This is where you should start writing server-side code for this application.

//Import the mongoose module
const express = require('express');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./router');
const cors = require('cors');
const session = require('express-session');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1:27017/fake_so';
mongoose.connect(mongoDB, { useNewUrlParser: true }).then(() => {
  const app = express();
  app.use(session({ secret: 'fakestackoverflowsecret', cookie: {}, resave: true, saveUninitialized: true }));

  app.listen(8000, () => {
    console.log('start');
  });
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  var corsOptions = {
    origin: 'http://localhost:3000',
  };

  app.use(cors(corsOptions));
  app.use('/', router);
});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

mongoose.connection.on('disconnected', () => {
  console.log('Server closed. Database instance disconnected');
});
