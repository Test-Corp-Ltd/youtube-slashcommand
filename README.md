# /youtube Slash Command for Slack (Node.js/express)

Search YouTube from within Slack using the **/youtube** slash command. WOOOO

### Usage
Just type `/youtube [SEARCH_TERMS]` asdfasdasd

### Getting Started
- Grab the code
- You will need to set up a slash command in Slack. You can do that [here](https://my.slack.com/services/new/slash-commands). While setting this up you'll see the Slash Command token. Grab it.
- Create an incoming webhook in Slack. You can do this [here](https://my.slack.com/services/new/incoming-webhook). There will be an incoming webhook URL which you will need in order to send messages back to Slack. Grab it.
- You will also need to grab an API key for YouTube. Find out how to do this [here](https://developers.google.com/youtube/registering_an_application) .

### Replacing the placeholders in the code
In the code you will see: 

`var incWebhook = '[Incoming Webhook URL]';`

`var slashCommandToken = '[Slash Command token]';`

```
var opts = {
  maxResults: 1,
  key: '[API key]'
};
``` 

You will have grabbed the required values while setting up your Slash command/incoming webhook/Google developer project. Replace the placeholders.

### Getting it hosted so you can use it
An easy and fast way to do this is using Heroku. Youn find out more about this [here](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction).

### Notes
It needs a bit of work. At the moment is only returns the top result. Plus just needs just a bit of tidying/bettering/stabling (making more stable). Going to add some better formatting of incoming webhook + more options for parameters that can be parsed. 
