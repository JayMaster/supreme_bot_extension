console.log('this is setCookie.js')

if (!chrome.cookies) {
	chrome.cookies = chrome.experimental.cookies;
}

console.log(chrome.cookies);

cookieDetails = {
	url: 'https://www.supremenewyork.com/shop',
	name: 'julien',
	value: 'isTheBest',
	// domain
}

chrome.cookies.set(cookieDetails, function(cookie) {
	console.log(cookie)
})