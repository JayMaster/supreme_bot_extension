// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// import { test } from './site_interactions/addToCart.js';

console.log('Chrome extension content.js');

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
  // console.log(getSizeId());
  console.log('content.js')
  console.log(message.tab.url);
  console.log(sender);
  // console.log(sendResponse);
}

let category = 'accessories'
let searchedName = "oreo"
let searchedColor = "White"
let searchedSize = "Large"


// const goToArticle = async() => {
// 	let articles = document.getElementsByClassName('inner-article'); // get all articles in the category

// 	for (var i = 0; i < articles.length; i++) {
// 		let article = articles[i];
// 		console.log(article)
// 		let articleTitle = article.getElementsByTagName('h1')[0].innerText;
// 		let articleColor = article.getElementsByTagName('p')[0].innerText;

// 		if (articleTitle.includes(searchedName)) {
// 			article.getElementsByTagName('a')[0].click();
// 			console.log('Found valid article')
// 			break;
// 		}
// 	}
// }

// const goToCheckout = async() =>  {
// 	document.getElementsByClassName('button checkout')[0].click() // 'zur Kasse'
// }

// const doCheckout = async() => {
// 	// entering customer details now
// 	document.getElementsByName('order[billing_name]')[0].value = 'aa aa';
// 	document.getElementsByName('order[email]')[0].value = 'aa@aa.de';
// 	document.getElementsByName('order[tel]')[0].value = 'aa';
// 	document.getElementsByName('order[billing_address]')[0].value = 'aaa 13';
// 	document.getElementsByName('order[billing_address_3]')[0].value = 'aaa';
// 	document.getElementsByName('order[billing_city]')[0].value = 'aaa';
// 	document.getElementsByName('order[billing_zip]')[0].value = 'aaa';
// 	document.getElementById('order_billing_country').value = 'aaa';

// 	document.getElementById('credit_card_type').value = 'master';
// 	document.getElementById('cnb').value = '1234 1234 1234 1234';
// 	document.getElementById('credit_card_month').value = '09';
// 	document.getElementById('credit_card_year').value = '2099';
// 	document.getElementById('vval').value = '123';

// 	document.getElementById('order_terms').value = '1';
// 	document.getElementsByClassName('icheckbox_minimal')[1].classList.add('checked');
// }

async function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

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