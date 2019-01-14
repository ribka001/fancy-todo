var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors')

mongoose.connect('mongodb://localhost/todoH8');
// mongoose.connect('mongodb://ribka001:ribka001@ds255784.mlab.com:55784/todo-h8', { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connect to database")
});

var usersRouter = require('./routes/users');
var tasksRouter = require('./routes/tasks');
var projectsRouter = require('./routes/projects');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);
app.use('/projects', projectsRouter);

module.exports = app;