var fetch = require('node-fetch');
const axios = require('axios');

const getCart = async () => {
	const responseCart = await axios({
		method: 'get',
		url: 'https://www.supremenewyork.com/shop/cart_extended.json',
		headers: {
			// 'accept': 'application/json',
			// 'accept-encoding': 'gzip, deflate, br',
			// 'if-none-match': 'W/"d751713988987e9331980363e24189ce"',
			// 'referer': 'https://www.supremenewyork.com/mobile/',
			'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25',
			'cookie': '_supreme_sess=R3orUDJpcytZWlpXMWJ1VU11NjA5TlFScWM5KzBMTXhtaEtaeE5CUmxOMVRCTERyckt0Wm10UTAxbjExc2VvOUxUWnIzZ1NtYmE0akNOMXVKemhqOU4yQkN4TWJNbjkxaVRlRWxVZ29EUU5qdUhZUWYzOUJ2WDZZWnpjT0RvQkFOOER1ei9tdmNmQlQ3OUo1Rlo4N1RycithOEo1VHpFV05icE1xaHN1L1FiUHlUUElLSUV1bDBZaStCYW93MGNjalI5ckIxb2VnbGowTWYvaEdKNjFmVXhIbDZoZ1RWQnAyWHNDUURoaVVwd2FKbGl6VUwrK3JRSk5xVUJaYm11cUZnbkR4dGliSXRvRU0vVkJVQmxnNXhRL3FlbDRqMytCWCtFamx4NEc2ZU15Mng3V0hpK01pSVVTdmtaUE5sczd5UkNaeTl3SkpaTkZMQXpCdktRdkpGYUxYQURJaE1BNFowSXFkWEl1UlU1bWtaWjBCUS96VkdXcTMybGlNVTJCSjEySEVsdFFybkNMNW11VUEzdjVUS25iTEFWQ0EyK2g0NHJkOEdpODBJQT0tLUQyMXRRVWJjQ2xDUFd2RVY5Qm1ZMUE9PQ%3D%3D--a563d0ac0207099b2bbbd735c549f4691e8750d5; domain=.supremenewyork.com; path=/; expires=Wed, 19 Jun 2019 11:31:14 -0000; HttpOnly',
			// 'x-requested-with': 'XMLHttpRequest',
		}
	})
	console.log(responseCart);
}

getCart();