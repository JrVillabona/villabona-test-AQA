class ResultsPage {

    constructor(page) {
        this.page = page;
    }

    async getNumberOfLinks(page) {
        await this.page.waitForSelector('body > div.pg-search.pg-wrapper > div.pg-no-rail.pg-wrapper > div > div.l-container > div.cnn-search__right > div > div.cnn-search__results-count', {
            timeout: 40000
        });
        const links = await this.page.evaluate(() => {
            return Array.from(document.querySelectorAll('body > div.pg-search.pg-wrapper > div.pg-no-rail.pg-wrapper > div > div.l-container > div.cnn-search__right > div > div.cnn-search__results-count'));
        });
        return links.length;

    }
    
    async checkIfResultsExist(page) {
        await this.page.waitForSelector('body > div.pg-search.pg-wrapper > div.pg-no-rail.pg-wrapper > div > div.l-container > div.cnn-search__right > div > div.cnn-search__results-list > div', {
            timeout: 40000
          });
        const text = await this.page.evaluate(() => {
            return document.querySelector('body > div.pg-search.pg-wrapper > div.pg-no-rail.pg-wrapper > div > div.l-container > div.cnn-search__right > div > div.cnn-search__results-list > div').textContent;
        });
        return !text.includes('did not match any documents.');
        
    }

}

module.exports = ResultsPage;

