console.log('background running');

// chrome.tabs.getCurrent((tab) => console.log('tab: ', tab))

// chrome.tabs.query({  }, function (tabs) {
//   console.log(tabs);
// });

// chrome.browserAction.onClicked.addListener(buttonClicked);
// function buttonClicked(tab) {
//   let msg = {
//     txt: 'hello',
//     tab
//   };
//   chrome.tabs.sendMessage(tab.id, msg);
// }

// chrome.cookies.set(cookieDetails, (res) => console.log(res));

function setSupremeCookie(cookie) {
	console.log('setting _supreme_sess cookie to ' + cookie);
	let cookieDetails = {
		url: 'https://www.supremenewyork.com/shop',
		name: '_supreme_sess',
		value: cookie
		// domain: '.supremenewyork.com'
	}
	chrome.cookies.set(cookieDetails, (res) => {
		console.log('res from cookies.set: ', res)

	})
}

chrome.extension.onMessage.addListener(function(response, sender, sendResponse) {
	if (response.msg.includes('ifsdss')) {
		console.log('found ifsdss!')
		let cookie = response.msg.substring(response.msg.indexOf('ifsdss') + 7)
	    setSupremeCookie(cookie);
	    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
			console.log(tabs[0]);
			chrome.tabs.sendMessage(tabs[0].id, {msg: 'go'})
		});
	} else {
		console.log('no cookies found')
	}
});