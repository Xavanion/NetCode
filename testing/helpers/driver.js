const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

function buildDriver() {
	let options = new chrome.Options();

	options.addArguments('--headless');
	options.addArguments('--headless', '--disable-gpu');

	return new Builder().forBrowser('chrome').setChromeOptions(options).build();
}

module.exports = buildDriver;

