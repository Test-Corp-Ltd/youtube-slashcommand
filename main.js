var request = require('request');
var search = require('youtube-search');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: true }));

//incoming webhook URL - put it here
var incWebhook = '[Incoming Webhook URL]';

//Slack slash command token - put it here
var slashCommandToken = '[Slash Command token]';

//parameters (AND API KEY) for the youtube search request
var opts = {
  maxResults: 1,
  key: '[API key]'
};

app.post('/', function(req, res){

	//grab useful things from request
	var searchTerms = req.body.text;
	var channel = req.body.channel_id;

	//check Slash Command token - makes sure this request is coming from your team!
	if (req.body.token !== slashCommandToken) {
    	return res.sendStatus(403);
  	}

	//search that shit
	search(searchTerms, opts, function(err, results) {
  		if(err){
  			console.log(err);
  			return res.sendStatus(500);
  		} 
 		
 		//send to function to send incoming webhook to Slack
  		sendToSlack(results[0].link, channel);
	});

});

//I'm listening
app.listen(process.env.PORT || 3000);

/** 
	This function sends incoming webhook to Slack. An incoming webhook is used in order
	for the slash command response to be a public message. If the content is included
	directly in the slash command response it is only visible to the user who sent it.
	Knowledge is power. 
**/
function sendToSlack (text, channel){

	//get the appropriate params loaded up for request
	var options = { method: 'POST',
  		url: incWebhook,
  		headers: { 'content-type': 'multipart/form-data; boundary=---011000010111000001101001' },
  		formData: 
   			{ 
     	  		payload: '{"text":"'+text+'","channel":"'+channel+'"}',
     	  	} 
     	};
    
    //send the fucking thing 	
	request(options, function (error, response, body) {
  		if (error){ 
  			throw new Error(error);
  			console.log(err);
  		}

  		console.log(body);
	});

}