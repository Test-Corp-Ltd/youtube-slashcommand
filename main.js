var request = require('request');
var passport = require('passport-slack');
var search = require('youtube-search');
var express = require('express');

//set up token variables - youtube
//need a listener to grab Slash commands - use express (app.use('/'))
//pass whatever is received by listener to search object
//take search response give to API poster
//API poster puts together POST request which is sent to API

//this will listen
var app = express();

//will need a Slack token - put it here
var slackToken = '[token]';


//optional parameters (AND API KEY) for the youtube search request
var opts = {
  maxResults: 1,
  key: 'AIzaSyAdKvTWZmREliQAqhRigdYoFCo1NSbfMNE'
};

/*
this will handle all requests - can build out later to provide different functionality via
different mounts
*/
app.use(function(req, res, next){

	//grab useful things from request
	var searchTerms = req.body.text;
	var channel = req.body.channel;

	console.log(searchTerms); //some testingssdd

	//search that shit
	search(searchText, opts, function(err, results) {
  		if(err){
  			return console.log(err);
  			res.send(500);
  		} 
 		
 		//print search results to log if no error
  		console.log(results);
  		sendToSlack(results, channel);
	});

	//let Slack know everything went OK
	res.send(200);
});

//I'm listening
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

function sendToSlack (body, channel){
	//get the appropriate params loaded up for request
	var options = { method: 'POST',
  		url: 'https://slack.com/api/chat.postMessage',
  		headers: { 'content-type': 'multipart/form-data; boundary=---011000010111000001101001' },
  		formData: 
   			{ 
   				token: slackToken,
     	  		channel: channel,
     	  		text: body,
     	  		username: 'YouTubeBot' 
     	  	} 
     	};

    //send the fucking thing 	
	request(options, function (error, response, body) {
  	if (error) throw new Error(error);

  	console.log(body);
	});

}