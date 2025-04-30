const buildDriver = require("../helpers/driver");

describe("Test for basic page load", () => {
  let driver;

  beforeAll(async () => {
    driver = buildDriver();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test("should load the homepage and check the title", async () => {
    await driver.get("http://localhost:9090");
    const title = await driver.getTitle();
    expect(title).toMatch("NetCode");
  });
});
