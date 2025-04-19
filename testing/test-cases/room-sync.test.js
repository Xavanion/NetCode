const buildDriver = require('../helpers/driver');
const { By, until } = require('selenium-webdriver');

describe('Real-time App multi-user tests', () => {
  let driver1, driver2;

  beforeAll(async () => {
    driver1 = buildDriver();
    driver2 = buildDriver();
  });

  afterAll(async () => {
    await driver1.quit();
    await driver2.quit();
  });

  test('Check for message sync between users in a room', async () => {
    await driver1.get('http://localhost:8080/?roomId=123');
    await driver2.get('http://localhost:8080/?roomId=123');

    const title1 = await driver1.getTitle();
    const title2 = await driver2.getTitle();

	testcase = `12345678asdasd$%^&*(`;

    await driver1.findElement(By.id('mainInput') ).sendKeys(testcase);

    // Optional: wait for real-time message to arrive on driver2
    await driver2.sleep(500);

	const outputEl = await driver2.findElement(By.id('mainInput'));

    await driver2.wait(
      async () => {
        const val = await outputEl.getAttribute('value');
		console.log(val);
        return val === testcase;
      },
      5000,             // timeout ms
    );
	const final = await outputEl.getAttribute('value');
    expect(final).toBe(testcase);
  });
});
