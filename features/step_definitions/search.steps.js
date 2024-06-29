const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { putText, getText } = require("../../lib/commands.js");

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 30 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", async function (string) {
  return await this.page.goto(`http://qamid.tmweb.ru${string}`, {
    setTimeout: 20000,
  });
});

When("user check film {string}", async function (string) {
  await this.page.waitForSelector(string, { timeout: 3000 });
  await this.page.click(string);
  await this.page.waitForSelector("div:nth-child(8) > span:nth-child(4)");
  await this.page.click("div:nth-child(8) > span:nth-child(4)");
  await this.page.waitForSelector(".acceptin-button");
  await this.page.click(".acceptin-button", { timeout: 3000 });
});

Then("user see page with code {string}", async function (string) {
  await this.page.waitForSelector(".acceptin-button", { visible: true });
  const actual = await this.page.$eval(".acceptin-button",(link) => link.textContent);
  expect(actual).contain(string);
});
