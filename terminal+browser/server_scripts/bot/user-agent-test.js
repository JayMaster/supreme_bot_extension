const axios = require('axios');

const size_id_placeholder = 56049;

/*
const config = {
	headers: {
		'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/603.1.23 (KHTML, like Gecko) Version/10.0 Mobile/14E5239e Safari/602.1',
		'content-type': 'application/x-www-form-urlencoded',
	}
};
*/

axios({
	method: 'get',
	url: 'https://google.com',
	headers: {
		"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/603.1.23 (KHTML, like Gecko) Version/10.0 Mobile/14E5239e Safari/602.1",
		"content-type": "application/x-www-form-urlencoded"
	}
})
.then((response) => {
    console.log(response);
})
.catch(response => {
    console.log(response);
});


/*
axios.get('https://google.com', {headers: {"User-Agent": 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/603.1.23 (KHTML, like Gecko) Version/10.0 Mobile/14E5239e Safari/602.1', "content-type": "application/x-www-form-urlencoded"}})
.then(response => {
	console.log(response);
})
.catch(response => {
	console.log(response)
});
*/