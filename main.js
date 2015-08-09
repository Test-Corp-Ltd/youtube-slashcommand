var request = require('request');
var passport = require('passport-slack');
var search = require('youtube-search');
var express = require('express');

var app = express();

//will need a Slack token - put it here
var slackToken = 'xoxb-6976337734-3cxWlNe9g76eQjSe8wWRBuYz';


//optional parameters (AND API KEY) for the youtube search request
var opts = {
  maxResults: 1,
  key: 'AIzaSyAdKvTWZmREliQAqhRigdYoFCo1NSbfMNE'
};

/*
this will handle all requests - can build out later to provide different functionality via
different mounts
*/
app.post('/', function(req, res){

	//grab useful things from request
	var searchTerms = req.query.text;
	var channel = req.query.channel;
	var token = 

	console.log('search terms received: '+ channel); //some testings

	//search that shit
	search(searchTerms, opts, function(err, results) {
  		if(err){
  			return console.log(err);
  			res.send(500);
  		} 
 		
 		//print search results to log if no error
  		console.log('Here are the results from YouTube:'results);
  		sendToSlack(results[0].link, channel);
	});

	//let Slack know everything went OK
	res.sendStatus(200);
});

//I'm listening
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

//sends request to Slack's postMessage method
function sendToSlack (text, channel){
	console.log('sendToSlack ' + channel);

	//get the appropriate params loaded up for request
	var options = { method: 'POST',
  		url: 'https://slack.com/api/chat.postMessage',
  		headers: { 'content-type': 'multipart/form-data; boundary=---011000010111000001101001' },
  		formData: 
   			{ 
   				token: slackToken,
     	  		channel: '#'+channel,
     	  		text: text,
     	  		username: 'YouTubeBot' 
     	  	} 
     	};

 	console.log('made it here!');
    
    //send the fucking thing 	
	request(options, function (error, response, body) {
  		if (error) throw new Error(error);

  		console.log(body);
	});

}