const { expect } = require("chai");
const { clickElement, putText, getText } = require("../lib/commands.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("http://qamid.tmweb.ru/client/index.php");
});

afterEach(() => {
  page.close();
});

describe("qamid.tmweb.ru tests", () => {
  test("One place check", async () => {
    const filmTimetLink = await page.$("li:nth-child(2) > a");
    const reservSelector = ".acceptin-button";
    await filmTimetLink.click();
    await clickElement(page, "div:nth-child(8) > span:nth-child(4)");
    await page.waitForSelector(reservSelector);
    await page.click(reservSelector, {timeout: 3000});
    await page.waitForSelector(reservSelector, {visible: true,});
    const actual = await page.$eval(reservSelector, (link) => link.textContent);
    expect(actual).contain("Получить код бронирования");
  });
  
  test("Three place check", async () => {
    const filmTimetLink = await page.$("li:nth-child(2) > a");
    const reservSelector = ".acceptin-button";
    await filmTimetLink.click();
    await clickElement(page, "div:nth-child(8) > span:nth-child(4)");
    await clickElement(page, "div:nth-child(6) > span:nth-child(5)");
    await clickElement(page, "div:nth-child(2) > span:nth-child(2)");
    await page.waitForSelector(reservSelector);
    await page.click(reservSelector, {timeout: 3000});
    await page.waitForSelector(reservSelector, {visible: true,});
    const actual = await page.$eval(reservSelector, (link) => link.textContent);
    expect(actual).contain("Получить код бронирования");
  });

  test("Disabled place check", async () => {
    const filmTimetLink = await page.$("li:nth-child(2) > a");
    const reservSelector = ".acceptin-button";    
    await filmTimetLink.click();
    await clickElement(page, "div:nth-child(9) > span.buying-scheme__chair.buying-scheme__chair_disabled");
    await page.waitForSelector(reservSelector);
    await page.click(reservSelector, { timeout: 3000 });
    const actual = await page.$eval(reservSelector, (link) => link.textContent);
    expect(actual).contain("Забронировать");
  });
});
