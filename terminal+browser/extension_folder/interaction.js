// let category = "accessories"
// window.location = "https://www.supremenewyork.com/" + "shop/all/" + category;
// todo: wait here

let searchedName = "Tagless Tees"
let searchedColor = "White"
let searchedSize = "Large"

const getSizeId = async(keyword, color, size) => {
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

	return size_id;
}

const goToArticle = async() => {
	let articles = document.getElementsByClassName('inner-article'); // get all articles in the category

	for (var i = 0; i < articles.length; i++) {
		let article = articles[i];
		console.log(article)
		let articleTitle = article.getElementsByTagName('h1')[0].innerText;
		let articleColor = article.getElementsByTagName('p')[0].innerText;

		if (articleTitle.includes(searchedName)) {
			article.getElementsByTagName('a')[0].click();
			console.log('Found valid article')
			break;
		}
	}
}

const addToCart = async() => {
	// TODO: choose size
	// let sizeId = getSizeId(searchedName, searchedColor, searchedSize)

	const sizeId = await getSizeId(searchedName, searchedColor, searchedSize)

	console.log("sizeId: " + sizeId);
	document.getElementById('size').value = sizeId;
	document.getElementsByTagName('input')[2].click() // 'hinzufuegen'
}

const goToCheckout = async() =>  {
	document.getElementsByClassName('button checkout')[0].click() // 'zur Kasse'
}

const doCheckout = async() => {
	// entering customer details now
	document.getElementsByName('order[billing_name]')[0].value = 'Peter Pan';
	document.getElementsByName('order[email]')[0].value = 'peter@fantasie.de';
	document.getElementsByName('order[tel]')[0].value = '123412341234';
	document.getElementsByName('order[billing_address]')[0].value = 'Fantasy Street 10';
	document.getElementsByName('order[billing_address_3]')[0].value = 'Buckingham Palace';
	document.getElementsByName('order[billing_city]')[0].value = 'a';
	document.getElementsByName('order[billing_zip]')[0].value = 'aaa';
	document.getElementById('order_billing_country').value = 'aaaa';

	document.getElementById('credit_card_type').value = 'master';
	document.getElementById('cnb').value = 'enter your cnb here';
	document.getElementById('credit_card_month').value = 'enter credit card month here';
	document.getElementById('credit_card_year').value = 'enter credit card year here';
	document.getElementById('vval').value = 'enter vval here';

	document.getElementById('order_terms').value = '1';
	document.getElementsByClassName('icheckbox_minimal')[1].classList.add('checked');
}

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

// fullProcess();

// wait(4000);
// addToCart();
// wait(100);
// goToCheckout();
// wait(3000);
// doCheckout();

// goToArticle();
// addToCart();
// goToCheckout();
// doCheckout();


/** IDEEN ZUR ABWEHR
// maus hovern (insbesondere über agb)


*/