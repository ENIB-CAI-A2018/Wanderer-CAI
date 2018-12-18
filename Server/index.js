#!/usr/bin/env node

// Load the express package
let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors')
// Create App
let app = express();
// Set port
let port = 8080;

// Enable CORS
app.use(cors());
// Let app parse req.body
app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Load Routes
let places = require('./routes/places');
let users = require('./routes/users');
// Apply routes
app.use('/places',places);
app.use('/users',users);

// Send index.html to '/'
app.get('/',function(req,res){
    res.sendFile( __dirname + '/public/index.html');
});

app.use(express.static('public'));

// Start the Server
app.listen(port);
console.log("Listening on http://localhost:"+port+"/");
