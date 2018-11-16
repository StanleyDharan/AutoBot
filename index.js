const puppeteer = require('puppeteer');

(async function main(){
    try {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.67 Safari/537.36');

        await page.goto('https://www.deadstock.ca/collections/new-arrivals');

        // awaits the grid of products to load
        await page.waitForSelector('.grid-uniform');

        //Gets the a collection of DOM Node based on selector provided
        const items = await page.$$('.grid-uniform .grid__item.grid-product.medium--one-half.large--one-quarter.small--one-half .grid-product__wrapper');

        //Loops through each DOM Node in collect looking for specified item
        for(const item of items){
            const title = await item.$eval('a.grid-product__meta span.grid-product__title', span => span.innerText);

            const regex = /\bNike.*?\bAir Max 97.*?\Silver/gm;

            if(await title.match(regex)){
                const shoe = await item.$('a');
                shoe.click();
                console.log("found shoe");
                break;
            }
        }



    }
    catch(e){
        console.log('code error: ' + e);
    }
})();

