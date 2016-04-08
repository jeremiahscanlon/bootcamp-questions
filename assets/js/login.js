// ===============================================================
// This file is for the login process 
// ===============================================================

// make sure the file loads
console.log('login.js loaded.');

// if someone is logged in forward page to account.html
if(document.URL.indexOf("login.html") >= 0 && userID){ 
	loadUrl('account.html');
}

// Main login function
function logIn(email, pass){
	db.authWithPassword({
			email    : email,
			password : pass
		}, function(error, authData) {
			if (error) {
			console.log("Login Failed!", error);

			$('#modal1Header').text('Login Unsucessful');
			$('#modal1Text').text('Login has failed. ' + error);
			$('#modal1').openModal();

		} else {
			console.log("Authenticated successfully with payload:", authData);

			var loginEmail = authData.password.email;
			userID = authData.uid;

			$('#modalLogin').closeModal();
			loadUrl('account.html');

		}
	});
}

$("#loginSubmit").on("click", function() {

	console.log('clicked the Login button!');

	// Capture User Inputs and store into variables
	var email = $('#loginEmail').val().trim();
	var pass = $('#loginPassword').val().trim();


	// clear the question boxes
	$('#loginEmail').val('');
	$('#loginPassword').val('');
	// send the variables through the function that writes them to the firebase
	logIn(email, pass);

	// Don't refresh the page!
	return false;
});

$("#loginCancel").on("click", function() {

	console.log('clicked the Login button!');
	$('#modalLogin').closeModal();
	loadUrl('index.html');

	// Don't refresh the page!
	return false;
});