let product_id_global = "";
let style_id_global = "";
let size_id_global = "";

let cookie = "";

const getData = async (keyword, color, size) => {
	const responseStock = await fetch('https://www.supremenewyork.com/mobile_stock.json');
	const stockData = await responseStock.json();
	// console.log(stockData.products_and_categories.Bags)
	const newProducts = stockData.products_and_categories.new;

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
}

const addToCart = async (keyword, color, size) => {
	await getData(keyword, color, size);
	let formData = new FormData();
	let query = {
		"size": size_id_global,
		"style": style_id_global,
		"qty": 1
	};
	formData.append("json", JSON.stringify(query));

	fetch('https://www.supremenewyork.com/shop/' + product_id_global + '/add.json',
		{
			method: 'POST',
			body: formData
		}
	)
	.then(function(res) {console.log(res);})
	.then(function(data){console.log(data);})
}

const aggregate = async() => {
	addToCart("Signature S/S Top", "Green", "Large");
}

aggregate();