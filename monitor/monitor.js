const axios = require('axios');

const monitor = async () => {
	const cartAddResponse = await axios({
		method: 'get',
		url: 'https://www.supremecommunity.com/restocks/eu/',
		// data: cartFormData
		headers: {
			// User Agent scheint sehr langsam zu sein, erstmal egal aber vielleicht
			// in die Cart tun ohne User Agent und checkout mit
			// 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/603.1.23 (KHTML, like Gecko) Version/10.0 Mobile/14E5239e Safari/602.1',
			// 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25',
			'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25',

			// 'content-type': 'application/x-www-form-urlencoded',
		}
	});
	console.log(cartAddResponse);
}
monitor();

// test!