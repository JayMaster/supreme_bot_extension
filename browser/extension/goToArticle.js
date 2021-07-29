const goToArticle = async() => {
	console.log('goToArticle');
	let articles = document.getElementsByClassName('inner-article'); // get all articles in the category
	let foundArticle = false;
	searchLoop: while(!foundArticle) {
		for (var i = 0; i < articles.length; i++) {
			let article = articles[i];
			console.log(article)
			let articleTitle = article.getElementsByTagName('h1')[0].innerText;
			let articleColor = article.getElementsByTagName('p')[0].innerText;

			if (articleTitle.toLowerCase().includes(searchedName.toLowerCase()) || searchedName.toLowerCase().includes(articleTitle.toLowerCase())) {
				foundArticle = true;
				article.getElementsByTagName('a')[0].click();

				// need workaround to simple click because match isnt triggered (see manifest)
				window.location = article.getElementsByTagName('a')[0].href;

				console.log('Found valid article');
				break searchLoop;
			}
		}
		await wait(100);
		window.location = 'https://www.supremenewyork.com/shop/all/' + category;
	}
}

goToArticle();