// ===============================================================
// This file is for the login process 
// ===============================================================

// make sure the file loads
//console.log('login.js loaded.');

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

function passwordReset(email){
	db.resetPassword({
		email : email
	}, function(error) {
		if (error === null) {
			console.log("Password reset email sent successfully");
		} else {
			console.log("Error sending password reset email:", error);
		}
	});
}

$("#loginSubmit").on("click", function() {

	console.log('clicked the modal login button!');

	// Capture User Inputs and store into variables
	var email = $('#loginEmail').val().trim();
	var pass = $('#loginPassword').val().trim();

	if (pass) {
		// clear the question boxes
		$('#loginEmail').val('');
		$('#loginPassword').val('');
		// send the variables through the function that writes them to the firebase
		logIn(email, pass);
	} else {
		$('#loginEmail').val('');
		passwordReset(email);
	};

	// Don't refresh the page!
	return false;
});

$("#cancel").on("click", function() {

	console.log('clicked the cancel login button!');
	$('#modalLogin').closeModal();

	// Don't refresh the page!
	return false;
});

$("#passwordReset").on("click", function() {

	console.log('clicked the password reset button!');
	$('#modalLoginHeader').text('Reset your Password');

	$('#modalLoginText').html(	'<div class="row">'+
									'<div class="input-field col s12">'+
										'<i class="material-icons prefix">email</i>'+
										'<input id="loginEmail" type="email" class="validate">'+
										'<label for="email" data-error="please enter a valid email">Enter Your Email</label>'+
									'</div>'+
								'</div>'
								);
	$('#modalLogin').openModal();

	// Don't refresh the page!
	return false;
});