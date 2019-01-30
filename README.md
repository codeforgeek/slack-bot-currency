Clone the repo and install the dependency.

```
npm i
```

create a file and name it ```config.js```.

here is the format.

```
module.exports = {
	slack: {
		token: '',
		channelName: 'general'
	},
	currencyLayer: {
		apiKey: '',
		apiEndPoint: '',
		sourceCurrency: 'USD'
	}
}

```

Then run the code.

```
node app.js
```

