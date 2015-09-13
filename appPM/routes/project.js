var mongoose = require("mongoose");
var Project = mongoose.model('Project');

//GET project creation form
exports.create = function(req, res){
    if(res.session.loggedIn === true){
     res.render('project-form', {
        title: 'Create Project',
        userid: req.session.user._id,
        userName: req.session.user.name,
        buttonText: "Make it so!"
    });   
    } else {
        res.redirect('/login');
    }
    
};

//POST new project creation form
exports.doCreate = function(req, res) {
    Project.create({
        projectName: req.body.projectName,
        createdBy: req.body.userid,
        createdOn: Date.now(),
        tasks: req.body.tasks
    }, function( err, project){
        if (err){
            console.log(err);
            res.redirect('/?error=project');
        } else {
            console.log("Project created and saved: " + project);
            console.log("project._id= " + project._id );
            res.redirect( '/project')
        }
            
    });
};

//GET projects by UserID
exports.byUser = function(req, res){
    console.log("Getting user projects");
    if (req.params.userid){
        Project.findUserByID(
            req.params.userid,
            function (err, projects){
                if (!err){
                    console.log(projects);
                    res.json(projects);
                } else {
                    console.log("No user id supplied");
                    res.json({ "status":"error", "error":"No user id supplied"});
                }
            });
    }
}

