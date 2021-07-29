const axios = require('axios');
const FormData = require('formdata');

// const size_id_placeholder = 56040;

// const bodyFormData = new FormData();
// bodyFormData.append("store_credit_id", "");
// bodyFormData.append("from_mobile", 1);
// bodyFormData.append("cookie-sub", encodeURI(JSON.stringify({"56040":1})));
// bodyFormData.append("same_as_billing_address", "1");
// bodyFormData.append("order[billing_name]", "Fantasy Name");
// bodyFormData.append("order[email]", "peterpan@gmail.com");
// bodyFormData.append("order[tel]", "12341234");
// bodyFormData.append("order[billing_address]", "Fanta 4");
// bodyFormData.append("order[billing_address_2]", "");
// bodyFormData.append("order[billing_address_3]", "Munich");
// bodyFormData.append("order[billing_city]", "Munich");
// bodyFormData.append("order[billing_zip]", "80333");
// bodyFormData.append("order[billing_country]", "DE");
// bodyFormData.append("credit_card[type]", "master");
// bodyFormData.append("credit_card[cnb]", "1234 1234 1234 1234");
// bodyFormData.append("credit_card[month]", "06");
// bodyFormData.append("credit_card[year]", "2019");
// bodyFormData.append("credit_card[vval]", "000");
// //bodyFormData.append("order[terms]", 0);
// bodyFormData.append("order[terms]", "1");
// //bodyFormData.append("g-recaptcha-response", "03AOLTBLT0ANWtT1TdNjOuIkY4bCfyQacNiR3fMKSk6mxyLG5Z0WIfmW3DdiM2kD1QnsX7vilbw7umXwPSnLZwCwTRNWKZJBxtMbFoZlzeJuipSvJZ42K9_eTtlRt7p2GdBkc9UA4DSkG1GCTKsZLSfLrOFq3wMlD5U20bfPHqH1KM-bl-MbTLIy7C-baQmweGIXLJ161gVzqlRSrDldrE6Y8SBtXWK4Stq3t60gBpOp7Fc-UVkQYGRaOoSxeNGScDs0yeHr9jeLcKf1ql7eBS2dj1GHFAROg1UjGGVK-jJA4XeIpCMY6ATW1iAFQA6B_fe2NxoioGdj_-OMNiahiBnlApCzD1Ffxni4khooVBBBhrfRWN6-CmNsM");

const cartFormData = new FormData();
cartFormData.append("size", "55917");
cartFormData.append("style", "25982");
// cartFormData.append("style", 101010101);
cartFormData.append("qty", 1);

// const config = {
// 	headers: {
// 		'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/603.1.23 (KHTML, like Gecko) Version/10.0 Mobile/14E5239e Safari/602.1',
// 		'content-type': 'application/x-www-form-urlencoded',
// 	}
// };

axios({
	method: 'post',
	// headers: config.headers,
	url: 'https://www.supremenewyork.com/shop/304260/add.json',
	// data: cartFormData,
	data: {
		"size": 55917,
		"style": 25982,
		"qty": 1
	},
	headers: {
		// User Agent scheint sehr langsam zu sein, erstmal egal aber vielleicht
		// in die Cart tun ohne User Agent und checkout mit
		'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/603.1.23 (KHTML, like Gecko) Version/10.0 Mobile/14E5239e Safari/602.1',
		'content-type': 'application/x-www-form-urlencoded',
	}
})
.then((response) => {
    console.log(response);
 //    console.log("added to cart")
 //    console.log(encodeURI(JSON.stringify({"56269":1}))); // TODO replace 56040 with variable
 //    axios({
	// 	headers: {
	// 		'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/603.1.23 (KHTML, like Gecko) Version/10.0 Mobile/14E5239e Safari/602.1',
	// 		'content-type': 'application/x-www-form-urlencoded'
	// 	},
	// 	method: 'post',
	// 	url: 'https://www.supremenewyork.com/checkout.json',
		
	// 	data: {
	// 		"store_credit_id": "",
	// 		"from_mobile": 1,
	// 		"cookie-sub": encodeURI(JSON.stringify({"56040":1})),
	// 		"same_as_billing_address": "1",
	// 		"order[billing_name]": "Fantasy Name",
	// 		"order[email]": "peterpan@gmail.com",
	// 		"order[tel]": "1234123",
	// 		"order[billing_address]": "Fantasy Street 32",
	// 		"order[billing_address_2]": "",
	// 		"order[billing_address_3]": "Munich",
	// 		"order[billing_city]": "Munich",
	// 		"order[billing_zip]": "80333",
	// 		"order[billing_country]": "DE",
	// 		"credit_card[type]": "master",
	// 		"credit_card[cnb]": "1234 1234 1234 1234",
	// 		"credit_card[month]": "06",
	// 		"credit_card[year]": "2019",
	// 		"credit_card[vval]": "000",
	// 		"order[terms]": "0",
	// 		"order[terms]": "1", // TODO ??
	// 		"g-recaptcha-response": "03AOLTBLSmv48j_9_yGjQDU-M4M9m5xsrqigVv-d24Ievdq2WkJ7KNN8HgZGsKkohOMmmoBnn2KuMuwEg3U39jddEboOujK9A8GvzQE5inx4UyiumynZTFMOUQ_0ORj96xBuxAbpzcVL9cGZlYT4sIBHJVlZL_Lt3fKb4e1L10qa3sUIPu4Mx969VrTOuomQDXVshQ8YER_AE4xjIlRqpmPRpJmm87SgN6-HUeXlhWl1uaixSuepRZY4q7-kZpEy11vZgj2nApU06r3VHeC9pbt7ylQmYFwOdUvjF4pyWG5YYPJl9tVOSK5OTqKLH2ayf-_Ws7D9JEksUUAAw7LkDEEKk5qgdJ0671_JniYRvUx7aDam6MXjMTVxs"
	// 	}
		
	// 	data: bodyFormData,
	// })
	// .then((response) => {
	//     // console.log(response);
	// })
	// .catch(response => {
	//     //handle error
	//     console.log(response);
	// });
})
.catch(response => {
    //handle error
    console.log(response);
});