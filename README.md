An interface for Telegram bots to send AI-generated memes from [imgflip](https://imgflip.com/ai-meme).

You can check out @AiMemesBot on Telegram.

Please note that I didn't get permission from imgflip for this. I am using an undocumented API that is being called when you generate a meme on their website. I have no idea how to implement an AI like this - I am just a web developer who knows how to communicate with REST interfaces and wanted to create something funny and wasted two days on it. 

## Setup

### 1. Prerequisites
* [node.js](https://nodejs.org/en/)
* [firebase-tools](https://www.npmjs.com/package/firebase-tools)

### 2. Setting up a Telegram bot
See [https://core.telegram.org/bots#6-botfather](https://core.telegram.org/bots#6-botfather).

### 3. Toggles to set with @BotFather
```
/setinline
/setinlinefeedback  Enabled
/setcommands  /empty
/setjoingroups Disable
```

### 4. config.js
Copy ```functions/src/config.json.template``` to ```functions/src/config.json``` and set the properties to the following:
*  `telegramBotToken` is your bot's token which was provided by the BotFather when you set up the bot.
* `imgflipUsername` username of any imgflip account (set one up [here](https://imgflip.com/signup))
* `imgflipPassword` the account's password - in unencoded text
* `imgflipToken` this is where it gets dodgy. 
  
  Open [https://imgflip.com/ai-meme](https://imgflip.com/ai-meme) in your browser (preferably a private tab), open the DevTools and go the the Network tab. 
  
  Now click on one of the memes. You'll see a POST to `ajax_ai_meme`. In the Form Data there'll be a __tok. Copy the value and set it as your `imgflipToken`
  
  I couldn't find out whether this token will be invalidated and some point or not, so please check up on it every other while.
  
 * `imgflipCookie` from the same request, the cookie `iflipsess`
 
   i.e. in the Headers there will be a cookie string like `__cfduid=abcdef; iflipsess=XXX; rootkey=abcdef` - copy the `XXX`
 * `selfUrl` the url the functions will be available at

### 5. bot-utils.js
bot-utils.js in the project root is a small commandline-tool for one-time setup with Telegram and health-checking after deployment.

Execute with ```node bot-utils.js``` and see usage with ```node bot-utils.js --help``` 

## Documentation

### Imgflip AI Meme API

#### Endpoint
POST https://imgflip.com/ajax_ai_meme

#### Necessary Headers
```
accept: application/json, text/javascript, */*; q=0.01
content-type: application/x-www-form-urlencoded; charset=UTF-8
cookie: iflipsess=hqs89rnb8bgdnovpe6frmu6baj
```

#### Form data

##### meme_id
* More memes than shown on https://imgflip.com/ai-meme do work 
  
  e.g. `28251713` ("Oprah Giveaway") returns
  ```json
  {
    "texts": [
      "you get an email! you get an email!",
      "everyone gets an email!!!"
    ],
    "final_text": "you get an email! you get an email!|everyone gets an email!!!|"
  }
  ```
* [List of meme popular meme ids](https://api.imgflip.com/popular_meme_ids)
* Some memes from this list don't work

  e.g. `29617627` ("Look at Me") returns
  ```json
  {
    "error": "Whoops, that meme failed to generate, try again in a minute"
  }
   ````
  


