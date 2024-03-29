const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
//const uri = 'mongodb://rangooDb:rangoo1234***@ds133360.mlab.com:33360/rangoo'

// Connect To Database

mongoose.connect(config.database, {useNewUrlParser: true });

//mongoose.connect(uri, {useNewUrlParser: true });



// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database ');
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

const app = express();

const users = require('./routes/users');

// Port Number
const port = 3000;

// Body Parser Middleware
app.use(bodyParser.json());

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));


// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start Server
app.listen(port, () => {
  console.log('Server started on port '+port);
});
