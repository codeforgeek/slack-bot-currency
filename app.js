const SlackBot = require("slackbots");
const request = require("request");
const config = require('./config');

// initialize bot
const bot = new SlackBot({
	token: config.slack.token,
	name: "Currency Bot"
});

bot.on("start", () => {
	console.log("Bot is ready.");
});

// event raised when we type something on bot
// on each recieved message, filter it out
// the type 'message' is classified as user generated message

bot.on("message", (data) => {
	if(data.type==='message') {
		filterMessage(data)
	}
})

async function filterMessage(message) {
	// when user types report
	if(message.text === 'report') {
		let data = await getAllPair();
		let formattedData = "";
		Object.keys(data.quotes).forEach((singlePair) => {
			formattedData += singlePair;
			formattedData += ' : ' + data.quotes[singlePair] + '\n';
		})
		postMessage(formattedData)
	} else {
		// further processing can be done
		// such as custom commands
		return;
	}
}

function getAllPair() {
	return new Promise((resolve, reject) => {
		let apiEndPoint = config.currencyLayer.apiEndPoint.replace('$ACCESS_KEY$',config.currencyLayer.apiKey);
		request(apiEndPoint,(error,response,body) => {
			if(error) {
				return reject(error);
			}
			resolve(JSON.parse(body));
		})
	})
}

function postMessage(message) {
	bot.postMessageToChannel(config.slack.channelName, message);
}