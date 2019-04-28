class HomePage {

    constructor(page) {
        this.page = page;
    }

    async getTitle() {
        return this.page.title();
    }

    async searchFor(word) {
        await this.page.evaluate(() => {
            document.querySelector('#search-button').click();
          });
        await this.page.focus('#search-input-field')
        //await this.page.type('#search-input-field', word);
        await this.page.keyboard.type(word);
        await this.page.click('#submit-button')
    }

}

module.exports = HomePage;