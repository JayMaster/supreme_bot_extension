// puts item into cart and checks if it's in (via cookies)

var fetch = require('node-fetch');
const axios = require('axios');
const { exec } = require('child_process')

let product_id_global = "";
let style_id_global = "";
let size_id_global = "";

let cookie = "";

async function wait(ms) {
	console.log('wait was called')
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

function checkArrayForMatches(keywordsArray, productName) {
	for (let i = 0; i < keywordsArray.length; i++) {
		if (keywordsArray[i].includes(productName) || productName.includes(keywordsArray[i])) {
			return true;
		}
	}
	return false;
}

const getData = async (keywords, color, size, searchedCategory) => {
	// let product_id = "";
	// let style_id = "";
	// let size_id = "";
	let productFound = false;

	searchingProduct: while (!productFound) {
		const responseStock = await fetch('https://www.supremenewyork.com/mobile_stock.json');
		const stockData = await responseStock.json();
		const newProducts = stockData.products_and_categories.new;
		for (i = 0; i < newProducts.length; i++) {
			// if (newProducts[i].category_name == searchedCategory && newProducts[i].name.includes(keyword)) {
			if ((newProducts[i].category_name == searchedCategory[0] || newProducts[i].category_name == searchedCategory[1]) && checkArrayForMatches(keywords, newProducts[i].name)) {
				product_id = newProducts[i].id;
				// console.log("Found product_id " + product_id + " for " + newProducts[i].name);
				productFound = true;
				break searchingProduct; // TODO geht der?
			}
		}
		console.log("Couldn't find the product this run, will try again")
		await wait(250);
	}

	console.log('found product_id: ' + product_id);
	const responseID = await fetch('https://www.supremenewyork.com/shop/' + product_id + '.json');
	const stylesData = await responseID.json();
	const styles = stylesData.styles;

	// console.log('these are the styles I get: ', styles)

	for (i = 0; i < styles.length; i++) {
		// console.log('examined style: ', styles[i].name)
		if (styles[i].name == color[0] || styles[i].name == color[1]|| styles[i].name == color[2]) {
			style_id = styles[i].id;

			for (j = 0; j < styles[i].sizes.length; j++) {
				if (styles[i].sizes[j].name === size) {
					size_id = styles[i].sizes[j].id;
				}
			}
		}
		// else {
		// 	console.log('wrong style found.');
		// 	console.log("I'm looking for " + color + " but instead found " + styles[i].name)
		// }
	}
	product_id_global = product_id;
	style_id_global = style_id;
	size_id_global = size_id;
}

const addToCart = async (keywords, color, size, category) => {
	await getData(keywords, color, size, category);

	const cartAddResponse = await axios({
		method: 'post',
		url: 'https://www.supremenewyork.com/shop/' + product_id_global + '/add.json',
		// data: cartFormData,
		data: {
			"size": size_id_global,
			"style": style_id_global,
			"qty": 1
		},
		headers: {
			// User Agent scheint sehr langsam zu sein, erstmal egal aber vielleicht
			// in die Cart tun ohne User Agent und checkout mit
			// 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/603.1.23 (KHTML, like Gecko) Version/10.0 Mobile/14E5239e Safari/602.1',
			'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25',
			// 'content-type': 'application/x-www-form-urlencoded',
			'cookie': cookie
		}
	});
	// console.log("cartAddResponse data: ", cartAddResponse.data);
	cookie = cartAddResponse.headers['set-cookie'][3]; // this is the cookie!
	console.log('Added ' + keywords[0])
	// console.log("this is cookie: " + cookie);
}

const getCart = async () => {
	const responseCart = await axios({
		method: 'get',
		url: 'https://www.supremenewyork.com/shop/cart.json',
		headers: {
			'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25',
			'cookie': cookie
		}
	})
	console.log("responseCart data: ", responseCart.data);
}

const cartCheck = async() => {
	let firstProductNames = ['Motion'];
	let firstProductColors = ['Purple', 'Magenta', 'Lila']
	// let firstProductNames = ['Restless Youth'];
	// let firstProductColors = ['Black'];
	let firstProductCategories = ['Tops/Sweaters', 'Sweatshirts']
	// let secondProduct = ['Contrast Stitch Pocket Tee'];
	// let keywordsToLookFor = ['Signature']
	await addToCart(firstProductNames, firstProductColors, "Large", firstProductCategories);
	// await addToCart(secondProduct, "Black", "Medium", "Tops/Sweaters");
	// await addToCart("Signature S/S Top", "Green", "Medium");
	// exec('cd ~ && cd .. && cd .. cd /Applications/Google\ Chrome.app/Contents/MacOS/ && Google\ Chrome', (err, stdout, stderr) => {
	// exec('cd ~ && cd .. && cd .. && cd /Applications/Google\ Chrome.app/Contents/MacOS/ && ls', (err, stdout, stderr) => {
	cookie = cookie.substring(14, cookie.indexOf(';'))
	await exec(`open -n -a "/Applications/Google Chrome.app" --args https://www.supremenewyork.com/shop?ifsdss=${cookie} --no-first-run --new-window`, (err, stdout, stderr) => {
	  if (err) {
	    //some err occurred
	    console.error(err)
	  } else {
	   // the *entire* stdout and stderr (buffered)
	   console.log(`stdout: ${stdout}`);
	   console.log(`stderr: ${stderr}`);
	  }
	});
	// window.open('https://supremenewyork.com/') // TODO: add cookies
	// await getCart();
}

cartCheck();
