const doCheckout = async() => {
	// entering customer details now
	document.getElementsByName('order[billing_name]')[0].value = 'aa';
	document.getElementsByName('order[email]')[0].value = 'aa';
	document.getElementsByName('order[tel]')[0].value = 'aa';
	document.getElementsByName('order[billing_address]')[0].value = 'aa 13';
	document.getElementsByName('order[billing_address_3]')[0].value = 'aa';
	document.getElementsByName('order[billing_city]')[0].value = 'aa';
	document.getElementsByName('order[billing_zip]')[0].value = 'aa';
	document.getElementById('order_billing_country').value = 'aa';

	document.getElementById('credit_card_type').value = 'master';
	document.getElementById('cnb').value = '1234 1234 1234 1234';
	document.getElementById('credit_card_month').value = '01';
	document.getElementById('credit_card_year').value = '2099';
	document.getElementById('vval').value = '123';

	// document.getElementById('order_terms').value = '1';
	// document.getElementsByClassName('icheckbox_minimal')[1].classList.add('hover');
	// document.getElementsByClassName('icheckbox_minimal')[1].classList.add('checked');
	// document.getElementsByTagName('input')[17].click();
	document.getElementsByClassName('icheckbox_minimal')[1].click()

	document.getElementsByClassName('button checkout')[0].click();
	wait(10);
	document.getElementsByClassName('button checkout')[0].click();
}

doCheckout();