// puts item into cart and checks if it's in (via cookies)

// var fetch = require('node-fetch');
// const axios = require('axios');

console.log('hi this is serverInteraction.js');

import axios from 'axios';

let product_id_global = "";
let style_id_global = "";
let size_id_global = "";

let cookie = "";

const getData = async (keyword, color, size) => {
	const responseStock = await fetch('https://www.supremenewyork.com/mobile_stock.json');
	const stockData = await responseStock.json();
	// console.log(stockData.products_and_categories.Bags)
	const newProducts = stockData.products_and_categories.new;

	for (i = 0; i < newProducts.length; i++) {
		if (newProducts[i].name.includes(keyword)) {
			product_id = newProducts[i].id;
			// console.log("Found product_id " + product_id + " for " + newProducts[i].name);
			break; // TODO geht der?
		}
	}

	const responseID = await fetch('https://www.supremenewyork.com/shop/' + product_id + '.json');
	const stylesData = await responseID.json();
	const styles = stylesData.styles;

	for (i = 0; i < styles.length; i++) {
		if (styles[i].name === color) {
			style_id = styles[i].id;

			for (j = 0; j < styles[i].sizes.length; j++) {
				if (styles[i].sizes[j].name === size) {
					size_id = styles[i].sizes[j].id;
				}
			}
		}
	}
	console.log("Found product " + keyword);
	console.log("product_id: " + product_id);
	console.log("style_id: " + style_id);
	console.log("size_id: " + size_id);
	product_id_global = product_id;
	style_id_global = style_id;
	size_id_global = size_id;
}

const addToCart = async (keyword, color, size) => {
	// cookie = '_supreme_sess=MHp0VThkamJDbi92QWFPQnRFeTFjb2xmNXRmOWVYeUFOZE5vMU5RazdqQzJtWUFrK3h3THlldllkRE01a3htTExVUWNiSlFxMGtmb3RTaVVsb0gyRjZjblFvRDBaV1NSakI5UGpXQm00K0F2U1NJTnU4K0dZa3MrMlNPWXFGNzRVaVM5R29mTWhmMnl2Zkl6eVo4OStqTXExT09ycTFYYzlyVUx5WjF1d1VEU3BSVklQQUQrcTNIdWZINzZDMHVSbU0rK1VZNUV6cVFBb1k4ZW1wYzdwRWwzclprckZhUklxZWtQclZVYUM5dzZhai81aUtkck1JWlRGL0NwSFhnQ3NYM09oTER2K3dCZnkrM04yNFlLVURBeUFkZ1hVN2RIYmxBVXFJWkFtb0pnbXMvdWNlNTk3a09WYThmd3Q0RTh5ZTFadnIyS08xTDRzZEFGZ0xCY2JTY25WS0tuUUJEM2NITUtMUzNaSlNiUGVXWU92K2x3eWdTZFdPNmJxUHNtLS02cytSM3V4NGxrZlUxMGdBSEhKSnNnPT0%3D--a3db31e5fd526d437fcc8bfe6f0f441d396b3beb';
	await getData(keyword, color, size);

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
	console.log("cartAddResponse data: ", cartAddResponse.data);

	cookie = cartAddResponse.headers['set-cookie'][3]; // this is the cookie!
	cookie = cookie.substring(0, cookie.indexOf(';'))
	console.log("This is the new cookie: " + cookie);

	// console.log("setting cookie to: " + cookie);
}
/*
const getCart = async () => {
	// cookie = '_supreme_sess=MHp0VThkamJDbi92QWFPQnRFeTFjb2xmNXRmOWVYeUFOZE5vMU5RazdqQzJtWUFrK3h3THlldllkRE01a3htTExVUWNiSlFxMGtmb3RTaVVsb0gyRjZjblFvRDBaV1NSakI5UGpXQm00K0F2U1NJTnU4K0dZa3MrMlNPWXFGNzRVaVM5R29mTWhmMnl2Zkl6eVo4OStqTXExT09ycTFYYzlyVUx5WjF1d1VEU3BSVklQQUQrcTNIdWZINzZDMHVSbU0rK1VZNUV6cVFBb1k4ZW1wYzdwRWwzclprckZhUklxZWtQclZVYUM5dzZhai81aUtkck1JWlRGL0NwSFhnQ3NYM09oTER2K3dCZnkrM04yNFlLVURBeUFkZ1hVN2RIYmxBVXFJWkFtb0pnbXMvdWNlNTk3a09WYThmd3Q0RTh5ZTFadnIyS08xTDRzZEFGZ0xCY2JTY25WS0tuUUJEM2NITUtMUzNaSlNiUGVXWU92K2x3eWdTZFdPNmJxUHNtLS02cytSM3V4NGxrZlUxMGdBSEhKSnNnPT0%3D--a3db31e5fd526d437fcc8bfe6f0f441d396b3beb';
	const responseCart = await axios({
		method: 'get',
		url: 'https://www.supremenewyork.com/shop/cart.json',
		headers: {
			'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25',
			'cookie': cookie
		}
	})
	let supSessString = responseCart.headers['set-cookie'][0];
	supSessString = supSessString.substring(0, supSessString.indexOf(';'))
	console.log("this is new cookie: " + supSessString);
	cookie = supSessString;

	// console.log(responseCart.headers['set-cookie'][0]);
	// console.log("responseCart data: ", responseCart.data);
	// cookie = responseCart.headers['set-cookie'][3];
}

const checkout = async() => {
	// cookie = '_supreme_sess=ellmVmZGN0VLYWx4QytHdmt3THJzYWxqREQvaHR0K2hXUFQ3b2dScGRCOXIvNmxLTUQybklPNEo1aTZONkRKTGcvSzZBK2lydG05YW00QkI0T3h6emIzVEJydVBuV1lXU2RqcTNvbVFJRk84bGZRUEMxenpyR21oWGM2TURRWkJuVlRKc2x6eXF6SmJ6RDYxRjBOTURyODNWU25mV0JVdHZ6dXpXZFhoYUhWVjhGSmJjblJUeUR1d3FZNURMbVVaempUUnNmaUtES3pmMFQ4ejJyTi9jK09zUFBiVVlhQkdCU1pSSUlkNE91RjhRSzRpL3QxOTUzYk11SzJXaHFWVU04UFdhNDZjQ3RFSStuQVhnTWtqRVdpNjYzOWszaE1Oc2FYaWNTbkhweGlBdVp2NzBzVy9nS3c2WDZVODV2ZXpIb0hxRU9CRHdDWFh0YlIvUWNoTVJ3clNIREpJcWhSMFBSN2xET0dsRTNUelZwZHR2ZDJZdTRoekZJMmtCaFVHWXJZMkF0aFQwamtWaTdFZ2hCbTVDK0pLYi8xd3Fwejh5K3pCczM2MDNScz0tLVFPaTNyWlpubDV3SlU2QlVzdythRXc9PQ%3D%3D--b4d5b0e6c58bdeaf7ab3c99e569de31afdad7502';
	const checkoutReponse = await axios({
		method: 'post',
		url: 'https://www.supremenewyork.com/checkout.json',
		data: {
			"from_mobile": "1",
			"same_as_billing_address": '1',
			// "cookie-sub": encodeURI(JSON.stringify({"57558":1})),
			"order[billing_name]": 'f',
			"order[email]": 'felix.fantasie@gmail.com',
			"order[tel]": '01725374',
			"order[billing_address]": 'Flowstreet 32',
			"order[billing_address_2]": '',
			"order[billing_address_3]": 'Goettingen',
			"order[billing_zip]": '81234',
			"order[billing_country]": 'DE',
			"credit_card[type]": 'visa',
			"credit_card[cnb]": '1234123412341234',
			"credit_card[month]": '08',
			"credit_card[year]": '2019',
			"credit_card[vval]": '',
			"order[terms]": "0",
			"order[terms]": "1",
			// "g-recaptcha-response": '03AOLTBLROVptPTEQIcshlknzRkfBcoZgHS9YoVchQW0O8341hG6kPU_8DSCCIpISLIIoHYfPeqhuU0rq4y4d_ArwlNBw5tOnyqJphUreYt2a2y2878gollY1E8PrnUUQfk1kzbfhnh63XzPNwZlORhWrSLl5oTENsRdZASYjqj4XBu6IXxOr5ga8IKd_dnHr1dS4x4kMHurv5x7lHLZFqVHQ6dtTWeL21cujZ2IQ5W7dBSj1hubHvkxa4QJJFlDrgW2C0ZFbzd5J2i2h4fQFX04in78h5mNhnWxtM7d7Yi7-ywXcZLcTsIkphwCvHkEMm64EUsedqwf5M'
		},
		headers: {
			'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25',
			'cookie': cookie
		}
	})
	// console.log("I used these cookies: " + cookie);
	// console.log(JSON.stringify(checkoutReponse.data));
	console.log("checkoutResponse data: ", checkoutReponse.data);
}
*/

const cartCheck = async() => {
	// await addToCart("Topline Zip Up Sweatshirt", "Pale Orange", "Medium");
	await addToCart("Signature S/S Top", "Green", "Large");
	await addToCart("Bling Hooded Sweatshirt", "Red", "Large")
	// await getCart();
	// await checkout();
}

cartCheck();
