let models  = require('../models');
let express = require('express');
let fs = require('fs');
let router  = express.Router();

function placeExists (name) {
    return models.Place.count({ where: { name: name } })
      .then(count => {
        if (count != 0) {
          return true;
        }
        return false;
    });
}

router.get('/', function(req, res) {
  models.Place.findAll().then(function(places) {
    res.send(places);
  });
});

router.get('/find', function(req, res) {
  res.redirect('/places/find/'+req.query.name);
});

router.get('/findRandom', function(req, res) {
	models.User.findOne({ where: {email: req.query.user} }).then(user => {
		let likes = [];
		let dislikes = [];
		let interests = [];
		if(user.like) {  likes = user.like.split('||'); }
		if(user.dislike) { dislikes = user.dislike.split('||'); }
		interests = likes.concat(dislikes);

	  models.Place.findAll().then(function(places) {

			if(places.length<=interests.length)
			{
				res.send("");
			}
			else
			{
				let index = Math.floor(Math.random()*places.length);
				while(interests.find(function(p)
						{
							return p==places[index].name;
						}
        ))
				{
					index = Math.floor(Math.random()*places.length);
				}

				res.send(places[index])
			}
	  });

	});
});

router.get('/find/:placeName', function(req, res) {
  models.Place.findOne({ where: {name: req.params.placeName} }).then(place => {
    if(place==undefined)
    {
      res.send("{}");
    }
    else res.send(place);
  })
});

router.get('/destroy/:placeName', function(req, res) {
  models.Place.findOne({ where: {name: req.params.placeName} }).then(place => {
    if(place)
    {
      let images = [];
      images = place.images.split("||");
      for(let i =0; i<images.length; i++)
      {
        fs.unlink(__dirname + "/../public" + images[i], (err) => {
          if (err) {
              console.log("failed to delete local image:"+err);
          } else {
              console.log('successfully deleted local image');
          }
        });
      }
      models.Place.destroy({ where: {name: req.params.placeName} }).then(function(){
        res.send(req.params.placeName + " removed");
      })
    }
    else res.send("Place doesn't exists");
  });
});

router.post('/create', function(req, res) {
  let images = "";
  let base64Data = req.body.image0.replace(/^data:image\/png;base64,/, "");
  let path = "/images/" + req.body.name + "0.png"
  fs.writeFile(__dirname + "/../public" +path, base64Data, 'base64', function(err) {
    if(err) console.log(err);
  });
  images+=path;
  if(req.body.image1)
  {
    base64Data = req.body.image1.replace(/^data:image\/png;base64,/, "");
    path = "/images/" + req.body.name + "1.png"
    fs.writeFile(__dirname + "/../public" +path, base64Data, 'base64', function(err) {
      if(err) console.log(err);
    });
    images+='||'+path;
    if(req.body.image2)
    {
      base64Data = req.body.image2.replace(/^data:image\/png;base64,/, "");
      path = "/images/" + req.body.name + "2.png"
      fs.writeFile(__dirname + "/../public" +path, base64Data, 'base64', function(err) {
        if(err) console.log(err);
      });
      images+='||'+path;
      if(req.body.image3)
      {
        base64Data = req.body.image3.replace(/^data:image\/png;base64,/, "");
        path = "/images/" + req.body.name + "3.png"
        fs.writeFile(__dirname + "/../public" +path, base64Data, 'base64', function(err) {
          if(err) console.log(err);
        });
        images+='||'+path;
      }
    }
  }

  placeExists(req.body.name).then( placeExists => {
      if(!placeExists)
      {
        models.Place.create({
          name: req.body.name,
          country: req.body.country,
          longitude: req.body.longitude,
          latitude: req.body.latitude,
          images: images
        }).then(function() {
          res.redirect('/');
        });
      }
    }
  )
});

module.exports = router;
