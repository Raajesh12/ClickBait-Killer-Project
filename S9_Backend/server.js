/**
  Currently Allows for sentiment analysis
  Created using https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
  and http://www.alchemyapi.com/developers/getting-started-guide/using-alchemyapi-with-nodejs
  Uses AlchemyAPI object for processing and stuff
*/

/** 
  BASE SETUP
  =================================================================================================
  Get the packages we need
*/

var express = require('express');
var bodyParser = require('body-parser');
var secrets = require('./includes/secrets.js');

// Linkup to Mongoose
var mongoose = require('mongoose');
mongoose.connect(secrets.mongo_string);

// Create our Express application
var app = express();

// configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// cors
var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
};

app.use(allowCrossDomain);

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

var AlchemyAPI = require('./includes/alchemyapi.js');
var alchemyapi = new AlchemyAPI(secrets.api_string);

var History = require('./models/history');
var User = require('./models/user.js');

/**
  ROUTES
  =================================================================================================
*/

var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
router.get('/', function(req, res) {
    res.json({ message: 'Squad9 Backend routing (work pl0x)' });   
});

/**
  more routes for our API will happen here
  Users, handles saving and updating users
*/

router.route('/users')

// create a user (accessed at POST http://localhost:3000/api/users)
.post(function(req, res) {
    
    var user = new User();      // create a new instance of the user model
    user.urlhistory = [];
    user.name = "Bob";

    // save the user and check for errors
    user.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: "User Log Created" });
    });
    
})

// get all the users (accessed at GET http://localhost:3000/api/users)
.get(function(req, res) {
  User.find(function(err, userlogs) {
      if (err) {
        res.send(err);
      } else {
        res.json(userlogs);
      }
  });
});


router.route('/users/:user_name')

  // get the user with that id (accessed at GET http://localhost:8080/api/users/:user_id)
  .get(function(req, res) {
    // User.findOne({'name': req.body.name}
      User.findOne({ 'name': req.params.user_name }, function(err, user_instance) {
          if (err) {
            res.send(err);
          } else {
            res.json(user_instance);
          }
      });
  })
  
  .put(function(req, res) {

      // use our user model to find the user we want
      User.findOne({ 'name': req.params.user_name }, function(err, user_instance) {

          if (err)
              res.send(err);

          var history = user_instance.urlhistory;

          history[history.length - 1].score = req.body.score;

          user_instance.urlhistory = history;  // update the users info
          // save the user

          User.findOneAndUpdate({ 'name': req.params.user_name }, user_instance, function(err) {
            if (err) {
                res.send(err);
              }
              else {
                res.json({ message: 'User updated!' });
              }
          })
      });
  })
  
.delete(function(req, res) {
    User.remove({
        _id: req.params.user_id
    }, function(err, user_instance) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
});

//Handles alchemy's requests and stuff
router.route('/alchemy')
  // Get the Sentiment of a body of Text (accessed at POST http://localhost:3000/api/alchemy)
  .post(function(req, res) {
	var myInput = req.body.inputstyle;
	var myData = req.body.input;
	var myresponse = req.body.method;
	//is there way to call a function by string? it would be more elegant
	
	switch (myresponse) {
		case "entities":
			entities(req, res, myInput, myData);
			break;
		case "keywords":
			keywords(req, res, myInput, myData);
			break;
		case "concepts":
			concepts(req, res, myInput, myData);
			break;
		case "sentiment":
			sentiment(req, res, myInput, myData);
			break;
		case "text":
			text(req, res, myInput, myData);
			break;
		case "author":
			author(req, res, myInput, myData);
			break;
		case "language":
			language(req, res, myInput, myData);
			break;
		case "title":
			title(req, res, myInput, myData);
			break;
		case "relations":
			relations(req, res, myInput, myData);
			break;
		case "feeds":
			feeds(req, res, myInput, myData);
			break;
		case "microformats":
			microformats(req, res, myInput, myData);
			break;
		case "taxonomy":
			taxonomy(req, res, myInput, myData);
			break;
		case "combined":
			combined(req, res, myInput, myData);
			break;
		case "image":
			image(req, res, myInput, myData);
			break;
		case "image_keywords":
			image_keywords(req, res, myInput, myData);
			break;
		case "threespecial":
			threespecial(req, res, myInput, myData);
			break;
		default:
			res.send("Function Not Found");
	}
});


// all of our routes will be prefixed with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Server running on port ' + port);


/**
  ALCHEMY API HELPER FUNCTIONS
  ========================================================================
*/


function entities(req, res, inp, dat) {
	alchemyapi.entities(inp, dat,{}, function(response) {
		res.send({response});
	});
}

function keywords(req, res, inp, dat) {
	alchemyapi.keywords(inp, dat, {}, function(response) {
		res.send({response});
	});
}

function concepts(req, res, inp, dat) {
	alchemyapi.concepts(inp, dat, {}, function(response) {
		res.send({response});
	});
}

function sentiment(req, res, inp, dat) {
	alchemyapi.sentiment(inp, dat, {}, function(response) {
		res.send({response});
	});
}

function text(req, res, inp, dat) {
	alchemyapi.text(inp, dat, {}, function(response) {
		res.send({response});

	});
}

function author(req, res, inp, dat) {
	alchemyapi.author(inp, dat, {}, function(response) {
		res.send({response});
	});
}

function language(req, res, inp, dat) {
	alchemyapi.language(inp, dat, {}, function(response) {
		res.send({response});
	});
}

function title(req, res, inp, dat) {
	alchemyapi.title(inp, dat, {}, function(response) {
		res.send({response});
	});
}

function relations(req, res, inp, dat) {
	alchemyapi.relations(inp, dat, {}, function(response) {
		res.send({response});
	});
}

function category(req, res, inp, dat) {
	alchemyapi.category(inp, dat, {}, function(response) {
		res.send({response});
	});
}

function feeds(req, res, inp, dat) {
	alchemyapi.feeds(inp, dat, {}, function(response) {
		res.send({response});
	});
}

function microformats(req, res, inp, dat) {
	alchemyapi.microformats(inp, dat, {}, function(response) {
		res.send({response});
	});
}

function taxonomy(req, res, inp, dat) {
	alchemyapi.taxonomy(inp, dat, {}, function(response) {
		res.send({response});	
	});
}

function combined(req, res, inp, dat) {
	alchemyapi.combined(inp, dat, {}, function(response) {
		res.send({response});
	});
}

function image(req, res, inp, dat) {
	alchemyapi.image(inp, dat, {}, function(response) {
		res.send({response});
	});
}

function image_keywords(req, res, inp, dat) {
	alchemyapi.image_keywords(inp, dat, {}, function(response) {
		res.send({response});
	});
}

function threespecial(req, res, inp, dat) {

	var parameters = {
	  extract: 'author,taxonomy, doc-sentiment',
	  sentiment: 1
	};

	alchemyapi.combined(inp, dat, parameters, function(response) {
    User.findOne({'name': req.body.name}, function(err, user) {
      if (user === null) {

        var newUser = new User();
        newUser.name = req.body.name;
        newUser.urlhistory = [];

        newUser.urlhistory.push(response);

        newUser.save(function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log('new user saved');
          }
        });

      } else {
        
        console.log('update user here')
        user.urlhistory.push(response)

        user.save(function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log('user urlhistry updated');
          }
        });
      }
    });
    res.send({response});
	});
}