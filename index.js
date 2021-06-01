const puppeteer = require('puppeteer');
const SIGNUP_DATA = require('./settings');

(async () => {
  const browser = await puppeteer.launch();

  for(location in SIGNUP_DATA.center) {
    const page = await browser.newPage();
    await page.goto('https://www.survey-xact.dk/LinkCollector?key=JPH8ZGHNL21N', {
      waitUntil: 'networkidle2',
    });
  
    await page.click('input.next-button');
  
    await page.waitForSelector('input[type="text"]');
    console.log('Filling out name...');
    await page.type('input[type="text"]', SIGNUP_DATA.name);
    await page.click('input.next-button');
  
    await page.waitForSelector('input[type="text"]');
    console.log('Filling out age...');
    await page.type('input[type="text"]', SIGNUP_DATA.age);
    await page.click('input.next-button');
  
    await page.waitForSelector('input[type="text"]');
    console.log('Filling out address...');
    await page.type('input[type="text"]', SIGNUP_DATA.address);
    await page.click('input.next-button');
  
    await page.waitForSelector('input[type="text"]');
    console.log('Filling out city...');
    await page.type('input[type="text"]', SIGNUP_DATA.city);
    await page.click('input.next-button');
  
    await page.waitForSelector('input[type="text"]');
    console.log('Filling out phonenumber...');
    await page.type('input[type="text"]', SIGNUP_DATA.phone);
    await page.click('input.next-button');
  
    await page.waitForSelector('input[type="radio"]');
    console.log(`Selecting vaccinecenter ${SIGNUP_DATA.center[location]}`)
    const a = await page.$x(`//label[contains(text(), '${SIGNUP_DATA.center[location]}')]`);
    await a[0].click();
    await page.click('input.next-button');
  
    await page.waitForTimeout(1000);
    await page.click('input.next-button');
  
    // Final submit
    await page.waitForTimeout(1000);
    await page.click('input.next-button');
  
    // We wait a bit, it's not really needed.
    await page.waitForTimeout(3000).then(() => console.log('Done :)'));  
  }

  await browser.close();
})();
