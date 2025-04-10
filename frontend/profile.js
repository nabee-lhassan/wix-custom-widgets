import wixStorage from 'wix-storage';

$w.onReady(function () {

	const firstName = wixStorage.session.getItem("firstName");
	const lastName = wixStorage.session.getItem("lastName");
	const email = wixStorage.session.getItem("email");
	const creadits = wixStorage.session.getItem("creadits");
	const subscribed = wixStorage.session.getItem("subscribe_for_news");
	


	$w('#text268').text = firstName + " " + lastName;
	$w('#text267').text = email;
	$w('#text269').text = "Creadits :" + " " + creadits;
	if(subscribed === 'false'){

	$w('#text269').text = "Subscribe :" + "" + "No";
	}else if (subscribed === 'true'){

	$w('#text269').text = "Subscribe :" + "" + "Yes";
	}



});