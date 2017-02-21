//BASE SETUP
//=================================================================================================
// Get the packages we need
var express = require('express');
var bodyParser = require('body-parser');
// Create our Express application
var app = express();


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

//Linkup to Mongoose
//What's the relation to secret?
var mongoose   = require('mongoose');
//mongoose.connect('mongodb://squad9:password@ds015924.mlab.com:15924/squad9'); // connect to our database
mongoose.connect('mongodb://196team:squad9@ds119788.mlab.com:19788/clickbaitkiller') //connect to our new database

//Add Bears to server.js
var Bear = require('./models/bear');
var History = require('./models/history');

//ROUTES
//=================================================================================================

var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our history log!' });   
});

// more routes for our API will happen here
router.route('/history')

    // create a bear (accessed at POST http://localhost:3000/api/bears)
    .post(function(req, res) {
        
        var history = new History();      // create a new instance of the Bear model
        history.sourcedata = req.body.input;  // set the bears name (comes from the request)
        console.log(req.body.input);
        // save the bear and check for errors
        history.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: "History Log Created" });
        });
        
    })
    
    // get all the bears (accessed at GET http://localhost:3000/api/bears)
    .get(function(req, res) {
        History.find(function(err, historylogs) {
            if (err)
                res.send(err);

            res.json(historylogs);
        });
    });


router.route('/history/:history_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        History.findById(req.params.history_id, function(err, history_instance) {
            if (err)
                res.send(err);
            res.json(history_instance);
        });
    })
    
    .put(function(req, res) {

        // use our bear model to find the bear we want
        History.findById(req.params.history_id, function(err, history_instance) {

            if (err)
                res.send(err);

            history_instance.sourcedata = req.body.sourcedata;  // update the bears info

            // save the bear
            history_instance.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'History updated!' });
            });

        });
    })
    
    .delete(function(req, res) {
        History.remove({
            _id: req.params.history_id
        }, function(err, history_instance) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Server running on port ' + port);
