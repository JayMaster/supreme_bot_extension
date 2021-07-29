// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// import { test } from './site_interactions/addToCart.js';

async function wait(ms) {
	console.log('wait was called')
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

console.log('Chrome extension content.js');

// chrome.tabs.getCurrent((tab) => console.log('tab: ', tab))

chrome.runtime.onMessage.addListener(gotMessage);

chrome.runtime.sendMessage({msg: window.location.href})

// const gotMessage = async(message, sender, sendResponse) => {
// 	if (message.msg == 'go') {
// 		console.log('got message! would now go to checkout')
// 		await wait(4000)
// 		window.location = 'https://supremenewyork.com/checkout'
//   	}
// }

function gotMessage (message, sender, sendResponse) {
	if (message.msg == 'go') {
		console.log('got message! would now go to checkout')
		// setTimeout(() => window.location = 'https://www.supremenewyork.com/checkout', 100)
		window.location = 'https://www.supremenewyork.com/checkout'
  	}
}

let category = 'accessories'
let searchedName = "oreo"
let searchedColor = "White"
let searchedSize = "Large"

const fullProcess = async() => {
	await wait(1000);
	await goToArticle();
	await wait(1000);
	await addToCart();
	await wait(1000);
	await goToCheckout();
	await wait(1000);
	await doCheckout();
}