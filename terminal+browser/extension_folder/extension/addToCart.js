console.log('addToCart.js')

const getSizeId = async(keyword, color, size) => {
	const responseStock = await fetch('https://www.supremenewyork.com/mobile_stock.json');
	const stockData = await responseStock.json();
	const newProducts = stockData.products_and_categories.Accessories; // TODO: make dynamic

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

const addToCart = async() => {
	// TODO: choose size
	// let sizeId = getSizeId(searchedName, searchedColor, searchedSize)

	// const sizeId = await getSizeId(searchedName, searchedColor, searchedSize)
	// console.log("sizeId: " + sizeId);
	// document.getElementById('size').value = sizeId;

	document.getElementsByTagName('input')[2].click() // 'hinzufuegen'
}

const goToCheckout = async() =>  {
	let buttons = document.getElementsByClassName('button checkout');
	let buttonFound = false;
	buttonFinder: while (!buttonFound) {
		for (var i = 0; i < buttons.length; i++) {
			if (buttons[i].innerText == 'zur kasse') {
				buttons[i].click();
				buttonFound = true;
				break buttonFinder;
			}
		}
		wait(100);
	}

	// document.getElementsByClassName('button checkout')[0].click() // 'zur Kasse'
	// need bug workaround:
	// window.location = "https://www.supremenewyork.com/checkout";
}

const addToCartAndGoToCheckout = async() => {
	await addToCart();
	await wait(100);
	await goToCheckout();
}

addToCartAndGoToCheckout();