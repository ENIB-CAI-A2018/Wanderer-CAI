let models  = require('../models');
let express = require('express');
let bcrypt = require('bcrypt');
let fs = require('fs');
let router  = express.Router();

function userExists (email) {
    return models.User.count({ where: { email: email } })
      .then(count => {
        if (count != 0) {
          return true;
        }
        return false;
    });
}

function userFind (email) {
    return models.User.findOne({ where: {email: email} }).then(user => {
      return user;
    });
}

router.get('/', function(req, res) {
  models.User.findAll().then(function(users) {
    res.send(users);
  });
});


router.post('/signin', function(req, res) {
  userExists(req.body.email).then( userExists => {
      if(!userExists)
      {
        bcrypt.hash(req.body.password, 10, function(err, hash) {
          if(!err)
          {
            models.User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
              }).then(function() {
                res.status(200).send("Account created");
              });
          }
          else res.send(err);
        });
      }
      else {
        res.status(400).send("Account already exists");
      }
    }
  )
});

router.post('/login', function(req, res) {
  userExists(req.body.email).then( userExists => {
      if(userExists)
      {
        userFind(req.body.email).then( user => {
          bcrypt.compare(req.body.password, user.password, function(err, bcryptRes) {
            if(bcryptRes) {
             console.log("Passwords match");
             res.status(200).send("Passwords match");
            } else {
             console.log("Passwords don't match");
             res.status(400).send("Passwords don't match");
            }
          });
        });
      }
      else {
        res.status(400).send("Account doesn't exists");
      }
    }
  )
});

router.post('/like', function(req, res) {
	if(req.body.place==undefined)
	{
		res.status(400).send("Place is undefined");
	}
	else {
			userExists(req.body.email).then( userExists => {
	      if(userExists)
	      {
	        userFind(req.body.email).then( user => {
	          let newLike;
	          if(user.like==null)
	          {
	            newLike = req.body.place;
	          }
	          else
	          {
	            newLike = user.like+"||"+req.body.place;
	          }
	          user.updateAttributes({
	            like: newLike
	          });
	          res.status(200).send("Done");
	        })
	      }
	      else {
	        res.status(400).send("Account doesn't exists");
	      }
	    }
	  )
	}
});

router.post('/dislike', function(req, res) {
	if(req.body.place==undefined)
	{
		res.status(400).send("Place is undefined");
	}
  else {
			userExists(req.body.email).then( userExists => {
	      if(userExists)
	      {
	        userFind(req.body.email).then( user => {
	          let newDislike
	          if(user.dislike==null)
	          {
	            newDislike = req.body.place;
	          }
	          else
	          {
	            newDislike = user.dislike+"||"+req.body.place;
	          }
	          user.updateAttributes({
	            dislike: newDislike
	          });
	          res.status(200).send("Done");
	        })
	      }
	      else {
	        res.status(400).send("Account doesn't exists");
	      }
	    }
	  )
	}
});

router.get('/destroy/:email', function(req, res) {
  models.User.findOne({ where: {email: req.params.email} }).then(user => {
    if(user)
    {
      models.User.destroy({ where: {email: req.params.email} }).then(function(){
        res.send(req.params.email + " removed");
      })
    }
    else res.send("User doesn't exists");
  });
});

router.get('/find/:email', function(req, res) {
  models.User.findOne({ where: {email: req.params.email} }).then(user => {
    if(user)
    {
			let likes = [];
			let dislikes = [];
			if(user.like) {  likes = user.like.split('||'); }
			if(user.dislike) { dislikes = user.dislike.split('||'); }
      let userData = { firstName : user.firstName, lastName : user.lastName, email : user.email, likes : likes, dislikes : dislikes}
      res.send(userData);
    }
    else res.send("User doesn't exists");
  });
});

module.exports = router;
