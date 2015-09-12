var mongoose = require("mongoose");
var User = mongoose.model('User');

/*
var newUser = new User({
    name: 'Simon Holmes',
    email: 'simon@theholmesoffice.com',
    lastLogin: Date.now()
});

newUser.save(function(err, user){
   if (!err){
       console.log('User saved!');
       console.log('Saved user name: ' + user.name);
       console.log('_id of saved user: ' + user._id);
   } 
});*/

//GET user creation form
exports.create = function(req, res){
    res.render('user-form', {
        title: 'Create user',
        buttonText: "Join!"
    });
};

//POST new user creation form
exports.doCreate = function(req, res) {
    User.create({
        name: req.body.FullName,
        email: req.body.Email,
        modifiedOn: Date.now(),
        lastLogin: Date.now()
    }, function( err, user){
        if (!err){
            console.log("User  created and saved: " + user);
        }
    });
};


