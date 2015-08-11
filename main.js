var request = require('request');
var passport = require('passport-slack');
var search = require('youtube-search');
var express = require('express');
var bodyParser = require('body-parser');


var app = express();

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: true }));

//TO-DO: need to use multiparty module to process Slash command post

//incoming webhook URL - put it here
var incWebhook = 'https://hooks.slack.com/services/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';

//Slack slash command token - put it here
var slashCommandToken = '5OcY8DC1fHWLyWDLUxRTZNDe';

//parameters (AND API KEY) for the youtube search request
var opts = {
  maxResults: 1,
  key: 'AIzaSyAdKvTWZmREliQAqhRigdYoFCo1NSbfMNE'
};

app.post('/', function(req, res){

	//grab useful things from request
	var searchTerms = req.body.text;
	var channel = req.body.channel;

	console.log('token: '+ req.body.token);

	//check Slash Command token
	if (req.body.token !== slashCommandToken) {
    	return res.sendStatus(403);
  	}

  	//some testings
	console.log('search terms received: '+ searchTerms); 
	console.log('channel received: '+ channel);

	//search that shit
	search(searchTerms, opts, function(err, results) {
  		if(err){
  			console.log(err);
  			return res.sendStatus(500);
  		} 
 		
 		//print search results to log if no error
  		console.log('Here are the results from YouTube:'+ results);
  		sendToSlack(results[0].link, channel);
	});

	//let Slack know everything went OK
	res.sendStatus(200);
});

//I'm listening
app.listen(process.env.PORT || 3000);

//sends request to Slack's postMessage method
function sendToSlack (text, channel){
	console.log('sendToSlack ' + channel);

	//get the appropriate params loaded up for request
	var options = { method: 'POST',
  		url: incWebhook,
  		headers: { 'content-type': 'multipart/form-data; boundary=---011000010111000001101001' },
  		formData: 
   			{ 
     	  		payload: '{"text":"'+text+'","channel":"'+channel+'"}',
     	  	} 
     	};

 	console.log('made it here!');
    
    //send the fucking thing 	
	request(options, function (error, response, body) {
  		if (error) throw new Error(error);

  		console.log(body);
	});

}