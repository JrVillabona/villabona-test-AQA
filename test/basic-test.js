const puppeteer = require('puppeteer');
const { expect }  = require('chai');

describe('CNN search using basic Puppeteer', () => {

    let browser;
    let page;
    

    beforeEach(async () => {
        browser = await puppeteer.launch({ headless: false, slowMo: 500, waitUntil: 'networkidle' });
        page = await browser.newPage();
        await page.goto('https://edition.cnn.com');
        await page.waitForSelector('#intl_homepage1-zone-1')
        await page.setViewport({ width: 1920, height: 1080 })
    });

    afterEach(async () => {
        await browser.close();
    });

    it('Should have the correct page title', async () => {
        expect(await page.title()).to.eql('CNN International - Breaking News, US News, World News and Video');
    });

    it('Should show that have results when searching actual word', async () => {

        await page.evaluate(() => {
            document.querySelector('#search-button').click();
          });
        //type NFL
        await page.focus('#search-input-field')
        await page.keyboard.type('NFL');
        //Click on the submit button
        await page.click('#submit-button')  

        await page.waitForSelector('body > div.pg-search.pg-wrapper > div.pg-no-rail.pg-wrapper > div > div.l-container > div.cnn-search__right > div > div.cnn-search__results-count', {timeout: 40000});
        const links = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('body > div.pg-search.pg-wrapper > div.pg-no-rail.pg-wrapper > div > div.l-container > div.cnn-search__right > div > div.cnn-search__results-count'));
        });
        //await page.screenshot({path: 'NFL.png'});
        expect(links.length).to.be.greaterThan(0);

    });

    it('Should show a warning when searching fake word', async () => {
        await page.evaluate(() => {
            document.querySelector('#search-button').click();
          });
          
          const selector = '#search-input-field';
          await page.waitForSelector(selector, {
            timeout: 40000
          });
          await page.type(selector, 'NFLFake', {delay: 100});

          await page.evaluate(() => {
            document.querySelector('button[type=submit]').click();
          });
          
        await page.waitForSelector('body > div.pg-search.pg-wrapper > div.pg-no-rail.pg-wrapper > div > div.l-container > div.cnn-search__right > div > div.cnn-search__results-list > div', {
            timeout: 40000
          });
        const text = await page.evaluate(() => {
            return document.querySelector('body > div.pg-search.pg-wrapper > div.pg-no-rail.pg-wrapper > div > div.l-container > div.cnn-search__right > div > div.cnn-search__results-list > div').textContent;
        });
        //await page.screenshot({path: 'NFLFake.png'});
        expect(text).to.contain('did not match any documents.');
        
    });


});


