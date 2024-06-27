const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { putText, getText } = require("../../lib/commands.js");

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
  const filmTimetLink = await page.$("li:nth-child(2) > a");
  const reservSelector = ".acceptin-button";
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

When("user check place {string}", async function (string) {
    await page.waitForSelector(filmTimetLink, {timeout: 3000});
    await filmTimetLink.click();
    await clickElement(page, string);
    await page.waitForSelector(reservSelector);
    await page.click(reservSelector, { timeout: 3000 });
});

Then("user see page with code {string}", async function (string) {
  await page.waitForSelector(reservSelector, { visible: true });
  const actual = await page.$eval(reservSelector, (link) => link.textContent);
  expect(actual).contain(string);
});
