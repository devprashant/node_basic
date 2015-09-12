//Bring the Mongoose into the project
var mongoose = require("mongoose");

//Build the connection string
var dbURI = "mongodb://test:test123@ds049171.mongolab.com:49171/app_pm";

//Create the database connection
mongoose.connect(dbURI);

mongoose.connection.on('connected', function(){
   console.log('Mongoose connected to ' + dbURI);
});


mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function() {
   console.log('Mongoose disconnected'); 
});

process.on('SIGINT', function(){
   mongoose.connection.close(function(){
       console.log('Mongoose disconnected through app termination');
       process.exit(0);
   });
});


var userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, 'unique': true },
    createdOn: { type: Date, 'default': Date.now },
    modifiedOn: Date,
    lastLogin: Date
});

var projectSchema = new mongoose.Schema({
    projectName: String,
    createdOn: Date,
    modifiedOn: { type: Date, 'default': Date.now },
    createdBy: String,
    tasks: String
});

//Build the User model
mongoose.model('User', userSchema);

//Build the Project model
mongoose.model('Project', projectSchema);








