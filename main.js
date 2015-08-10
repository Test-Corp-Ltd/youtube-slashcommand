var request = require('request');
var passport = require('passport-slack');
var search = require('youtube-search');
var express = require('express');

var app = express();

//Slack API token - put it here
var slackApiToken = 'xoxb-6976337734-3cxWlNe9g76eQjSe8wWRBuYz';


//Slack slach command token - put it here
var slashCommandToken = '5OcY8DC1fHWLyWDLUxRTZNDe';

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

	//check Slash Command token
	if (req.query.token !== slashCommandToken) {
    	return res.sendStatus(403);
  	}

  	//some testings
	console.log('search terms received: '+ searchTerms); 
	console.log('channel received: '+ channel);

	//search that shit
	search(searchTerms, opts, function(err, results) {
  		if(err){
  			return console.log(err);
  			res.sendStatus(500);
  		} 
 		
 		//print search results to log if no error
  		console.log('Here are the results from YouTube:'+ results);
  		sendToSlack(results[0].link, channel);
	});

	//let Slack know everything went OK
	res.sendStatus(200);
});

//I'm listening
app.listen(3000);

//sends request to Slack's postMessage method
function sendToSlack (text, channel){
	console.log('sendToSlack ' + channel);

	//get the appropriate params loaded up for request
	var options = { method: 'POST',
  		url: 'https://slack.com/api/chat.postMessage',
  		headers: { 'content-type': 'multipart/form-data; boundary=---011000010111000001101001' },
  		formData: 
   			{ 
   				token: slackApiToken,
     	  		channel: channel,
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