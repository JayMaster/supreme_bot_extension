var fetch = require('node-fetch');
const axios = require('axios');

let cookie = "";

let product_id_global = "";
let style_id_global = "";
let size_id_global = "";

const getData = async (keyword, color, size) => {
	const responseStock = await fetch('https://www.supremenewyork.com/mobile_stock.json');
	const stockData = await responseStock.json();
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
	product_id_global = product_id;
	style_id_global = style_id;
	size_id_global = size_id;
}

const addToCart = async (keyword, color, size) => {
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
		}
	});
	console.log("cartAddResponse data: ", cartAddResponse.data);
	cookie = cartAddResponse.headers['set-cookie'][3]; // this is the cookie!
}

const checkout = async() => {
	const checkoutReponse = await axios({
		method: 'post',
		url: 'https://www.supremenewyork.com/checkout.json',
		data: {
			"from_mobile": "1",
			"same_as_billing_address": '1',
			"cookie-sub": encodeURI(JSON.stringify({"57558":1})),
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
			// "g-recaptcha-response": '03AOLTBLSaqDYIKFQmOeBZAHLjd6peNEQqiDWF-c2dnx_xRnqBSDttLDcPcd6ESj8-zUcl7O49QXvnedxZTq_jbAbJemsAhVpnhExOfxicWlpObVzL-8s2meJDFxS8uHEZ7cWXxQkUBZe9XeVXsAssgNCKv7JN_foEP4kUJxp9WKn5-MZiIwPUX0GcOH6qf_d72gogxoyJjYsm5ti7mcx9MOdJKXIbwFX3a0P8ZFAKFjQghjYNaM9XKlpqoeybDuOdH3EnQ-AHwvI-P7CBocbRmvjdeGw_KTZXdZOrPOAcdCfjENYNp2UyBT9_ojNemiFUOa2qL1fM0X2bNPBUhVF93LdOEocJyn32_-gELnedTOyZRf8JXH_AUVxk7a3XVXXoyI41Dn76WPFf'
		},
		headers: {
			'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25',
			'cookie': cookie
		}
	})
	console.log(checkoutReponse);
}

const buy = async() => {
	// await getData();
	await addToCart();
	// await checkout();
}

buy();
// addToCart();