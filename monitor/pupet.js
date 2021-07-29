const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

let bodyHTML = "";

const getHTML = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.supremecommunity.com/restocks/eu/');
  bodyHTML = await page.evaluate(() => document.body.innerHTML);
  // console.log(bodyHTML);

  await browser.close();
};

const processHTML = async () => {
	await getHTML();
	// console.log(bodyHTML);
	const data = cheerio.load(bodyHTML);
	// console.log(data('div[class=restocks]').find());

	let items = data('.restock-item').nextAll();
	for (var i = 0; i < items.length; i++) {
		// console.log(items[i]);
		console.log(items[i].attribs['data-itemname']);
	}

	// console.log(data('.restock-item').nextAll()[0].attribs['data-itemname']);
}

// while (true) {
// 	setTimeout(() => {
// 		processHTML();
// 	}, 2000)
// }

// for (var i = 0; i < 10; i++) {
// 	setTimeout(() => {processHTML()}, 2000)
// 	// processHTML();
// }
processHTML();