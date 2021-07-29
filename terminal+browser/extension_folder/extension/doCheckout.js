const doCheckout = async() => {
	// entering customer details now
	document.getElementsByName('order[billing_name]')[0].value = 'aa';
	document.getElementsByName('order[email]')[0].value = 'aa';
	document.getElementsByName('order[tel]')[0].value = 'ab';
	document.getElementsByName('order[billing_address]')[0].value = 'abc';
	document.getElementsByName('order[billing_address_3]')[0].value = 'abc';
	document.getElementsByName('order[billing_city]')[0].value = 'background';
	document.getElementsByName('order[billing_zip]')[0].value = 'abc';
	document.getElementById('order_billing_country').value = 'DE';

	document.getElementById('credit_card_type').value = 'master';
	document.getElementById('cnb').value = 'enter cnb here';
	document.getElementById('credit_card_month').value = 'enter credit card month here';
	document.getElementById('credit_card_year').value = '2099';
	document.getElementById('vval').value = '999';

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