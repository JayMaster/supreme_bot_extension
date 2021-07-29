// puts item into cart and checks if it's in (via cookies)

var fetch = require('node-fetch');
const axios = require('axios');

let product_id_global = "";
let style_id_global = "";
let size_id_global = "";

// var bodyFormData = new FormData();

// let cookie = "K3dybU5XZ21ZVi9OVWFqby9hbENQUmg2K2ZseDRXNDlKemNaSmhiSVNvMnhRVEtBeGRMUi9jUUxSdExhUnFiSjVMYTV4UTdyYjg4eFZXajJzR08rWm84S0ZaUUkvdmVFdGtUenZTVzgyUFNFWlQxa1ZOL0QxM083VDh3RGpuODFybXg5ZGFIVW1xUDBQUlllMzFKZ0tYdW1JL2dsZkwwcEpJNFFtLzVJTUcwQXh4ZnlOUEZYTzVSZjNiL1N0anMxd3RjVUd0R1o5MHBHUThMUXhRclFaWVRVNklueDl6MS9jdlRIWURqR2IvNUNYWkNoaFllMlM3djQ4UFdjK3g0VGxGczd0WGlUZ1c0VWtBWkVHWGw3T2VsR0NiRUlVZllhU2Y3cDVXZWZ1YThqZ2N2UTdjSTllT0w5MFpjMGREK1BqMlo2Mk9RSk1oWWUrNXd1bUJFa2ZWa3ZZVG4rTm1XSWVDWTJoMzBwcGNUc1ZiWjRVTVFwdWhqUzlyNS9IK1NSTzZKblpXWk4vUFpuSjF0LzNORGpyL1o1dEV1aWtEdEhDYmNmVFpVU1ZjYURvbEJYamFJTmp4QVZPZ083dUxvOWp6TGU5OTJQclptbE1SSFB3VnFrdHIxa2YyM0FLa25JazJlcDlmckF2SEhhWmJ0ZkxGTzcvVGVHc2gwb2hBcFg3NUh4SVRacjBHN1RBSWRiZjhSbU9CcXRIaExudEdkRmZrMjlLZFlYVTZmWUVSNy9HQWxSY1RMTDJMWWp4bDU2LS04SGF0clQwWGZXYWFMOVFoa3I2MlFnPT0%3D--14789b4fc4b8fa98fd6eaa254630eef67ed5c80d";
// let cookie = "";
// let cookie = '_supreme_sess=VlRoL0hwZExlM3Y1QzNoWmxMWEROblVGOCtibFZTcWkzUmxiOWNBQzZDU3lLSjF5WVRYTTc0ZTNzeTBSOXFsS05pR3d0Z2pZVjhtUEw2YnE0bkZBMXpxTmlnVllXSlBLUzR4UlZvVGRsY2k1eWttTUxvRllGZWZlUDhKM1dhTzNnQit5dGczd3lYRUN5Q0paQU9BUGkyZnprSUYyTk8zNS90ZVZ6ODR2VUJwTUlpclpuZlV4Si9qRDBRNzQ4NE5XNC8xWG1uM0d0R1NabHdVeENKcFFxV1dIVmN1K0pjM0JzaHFKcGlVcUQzS3UzTFY2b2V2a2V1MEF3eWJ1SUZtQVFEVTRIWllSOFBkM2NPL2RtTUd5RER1dS9oa2p1aUcydEV1Y1cva0JvT2c9LS1yM29PcUw5Rm1ndDN2ZG9lT24xVWh3PT0%3D--1a14c15b761f86103a8ee61b2a5fd5a07582e575;';
let cookie = "";

const getData = async (keyword, color, size) => {
	const responseStock = await fetch('https://www.supremenewyork.com/mobile_stock.json');
	const stockData = await responseStock.json();
	const newProducts = stockData.products_and_categories.Accessories;

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

	// console.log(size_id_global, style_id_global)
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
	// cookie = cookie + ';';
	console.log("This is the new cookie: " + cookie);
}

const getCart = async () => {
	console.log('\n\ngetCart called!')
	// cookie = '_supreme_sess=KzJRaWFhQkFMSnJuem1sRlFuRDlCNnBXakN2UFVhVDYvNzZHMFowVlUwc0N5dkFiOWlRaU5IbVd4UW9UUXIzcEJjUWVyNS9SaWg5b2xoTkZ4TTBhTmorZmw0NS9EZldEbm5OUUwxaElrdUZEZW13TkZIRDNYRmNnT1lqNWk5TE8wU3ZhV2YrTXV5VThMM2xhQ05MOTB0Ymhsc05MVktrZjhCMlh6ZjROb2ZDV0dvQjBkUXhQamVhbDk4TWNKUXptYTZLV1dmVmxPU2pMR0hoOTFNMkh3TmN6NzFKK2ZuSHMrU0EyWXowZnFsV0dnY09ab0RmaythRjZuSExoNS9nc2ZEcjhzRFRCVXhnUVB6VDM4d1NIa2JEWU1ndU9qUFFzZGJ1QmhhTzJnKzg9LS13UjVLYnljZ0phRDhWS1dKRkdOYmdnPT0%3D--869f690f9190b7db077da6de9458b4d6f3050e1a';
	const responseCart = await axios({
		method: 'get',
		url: 'https://www.supremenewyork.com/shop/cart.json',
		headers: {
			// 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25',
			'User-Agent': 'Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.114 Mobile Safari/537.36',

			'cookie': cookie
		}
	})
	// let supSessString = responseCart.headers['set-cookie'][0];
	// supSessString = supSessString.substring(0, supSessString.indexOf(';'))
	// console.log("this is new cookie: " + supSessString);
	// cookie = supSessString;

	// console.log("\n\n" + responseCart.headers['set-cookie'][0]);
	console.log("responseCart data: ", responseCart.data);
	cookie = responseCart.headers['set-cookie'][3]; // I don't remember why I wrote this
}

const checkout = async() => {
	// cookie = '_supreme_sess=WXlIMUo3VG5FK29QcHE3QVhpOGx0SkNoQ1VwT2ltaDRJUk84bXljak80VURyKzZhOGhvLzhnU1Y2cmE5OFRRTE13QWhGdmM4RVJJSmh2RnpPUnNJdEJDVURYeitnamVoMjJqeGUrN2t6RTJPVGxTY24xVWxIeDBqU2s2WEowMHpVMU9KTXRBbk03Wm9PUFVYczMyQi9nd2phVEVkdldoV0t6ZVJSM0VtbUlDbFhVejFJTUhocmdnZ0pFdTJ2ZWtGS1ZQZTFSWWlTTWkwNzd5Y3AzUEpaalRNM3dDRzdaSXhVK1gzN2hGZEVOVjNnSTJlZU9rUU50TWFORDhkejUwUm4vSTVLMjhiOFNwQVd6aFA5R3JDalpkRlJYUGZwd1g0VGsyV0VWTUV3YUVYZWI3eXJ6aWxtZ041N2dhMEVzck11OWZrVERPT3dRRmN2d0k4VnJYakRBPT0tLTBaSyt2ZFVtbVRCVFhnUGJlV2k5eHc9PQ%3D%3D--550d9eae9f615953d464b18e4edaeee80932b9b9';
	// let cookie_sub = 
	// const params = new URLSeachParams();
	// var bodyFormData = new FormData();
	// bodyFormData.set('store_credit_id', '1') // append or set?
	const checkoutResponse = await axios({
		method: 'post',
		url: 'https://www.supremenewyork.com/checkout.json',
		// data: {
		// 	"store_credit_id": "",
		// 	// "cookie-sub": encodeURI(JSON.stringify({"63555":1})),
		// 	"cookie-sub": "%7B%2263555%22%3A1%7D",
		// 	"cardinal_id": "0_206f96c0-e813-432f-b9b0-4b1dbeec8533",
		// 	"order[terms]": "0",
		// 	"g-recaptcha-response": '03AHaCkAZEGrmlmkGYYsaOpl504rNINEtyvYx5SQ1TCkrtxtHxWP4zppW3ErqPvFz0aqBnucz1LjGenp-w__tevYYd7ucBnbN5kJwMB1huHhfdrmVlTG5meSeDzdZ_7ByTgR4bYPRaNvyIVbpbcgEwWyb38VGR_BexUl3Mq_HYIudiaUOoTAB5OAs9g27WWIlWIeleFsZVN56fdO7qvWhNBzbv-BD1Qk49p4QRU6jRv6F6Oo0SrIz8ULi3S7CATwwRDQD2zOt8LAv5Vbwile4ZrFL5suhk77GTtDPlKllS25u1KmfRl1YTc36G9o471hONo8Xtx-Q81JOQXOCn0cec9NS_jNPVmRkwgpRF_RgztlcVL2SUKcr98i5zAmjShzgCAJE6qX_9kFMxFmgzjJ3xr431kFkTzlz9h0rNYqXO53EQtbv-udAmm6d9ouWAmuXnpPnAuuMqonyV'
		// },

		data: {
			"from_mobile": "1", // this one is important!
			"same_as_billing_address": '1',
			"atok": "sckrsarur",
			"cookie-sub": "%7B%2263121%22%3A1%7D",
			"cardinal_id": "0_62fd97d7-832c-4d02-b265-534574657ab3",
			"order": {
				"billing_name": 'aaa',
				"billing_address": 'aa',
				"email": "aaa",
				"tel": "aa",
				"billing_address_2": "",
				"billing_address_3": "aa",
				"billing_zip": '12355',
				"billing_country": 'aa',
				"billing_city": 'aaa',
				"terms": "0",
				"terms": "1"
			},
			"credit_card": {
				"type": 'master',
				"cnb": '1234 1234 1234 1234',
				"month": '01',
				"year": '2099',
				"ovv": "999"
			},
			// "g-recaptcha-response": "03AHaCkAaJeNcFrZfS7IzCgslCIet0Ti6AXXpk9hzhAaItep0-h7MbFkYKCCzebnOAMEk2suQgBdfH511NTUtW4WlUWN0L861JN0CxG6_c2vL5eFWa0YroBlrunOOjgUSIxXrd8ih9Foch41XcjZjUPWLQU34DpxnVEHAJOmeZgDe8bMjAnR2giwYHTpjSPGX3gJrUDs4o-WNBrzH5oc9wBlloxbFHMGow6YxS27nUBdceqq_K5fQgO6jv1_6anPtRnMdW4U3cS9KFWDrnzDg620sCUSl3nOjsvjqwv_ynJdeHLet7yE7l9-xwMXLBgsQmnWdbEfXynbo8DgZvUCgk4XvJNAfktn2a-d95dXaBKLcfCHjNJuupz_dlFCV9-SQ1g7mT6Ecj6Bk1WbdcqUUrX4-6O6MX9y1-wPQJ8Q1cxCNB8St6W8CtUGU-9MfmCQZpXVykj6WH00N4"
		},

		headers: {
			// 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25',
			'User-Agent': 'Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.114 Mobile Safari/537.36',
			'cookie': cookie,
		}
	})
	// console.log("I used these cookies: " + cookie);
	// console.log(JSON.stringify(checkoutResponse.data));
	// console.log("checkoutResponse data: ", checkoutResponse.data);
	console.log("checkoutResponse data: ")
	console.log(JSON.stringify(checkoutResponse.data, null, 4));
}

async function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

const cartCheck = async() => {
	await addToCart("Tagless Tees", "White", "Large");
	// await addToCart("Logo Plaid Shirt", "Black", "Medium");
	// console.log("\n\n\n")
	// await getCart();
	// console.log("\n\n\n")
	await wait(2000);
	console.log("Going into checkout with cookie: " + cookie);
	await checkout();
}

cartCheck();


// captcha
// cardinal
// time-out
// cookies aus browser nehmen und damit weitermachen
// sonst vielleicht mal nicht als Mobile verstecken und alle Anfragen nochmal
// oder als mobile in den Warenkorb tun und dann als nicht-Mobile checkout machen