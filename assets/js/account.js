var userID ='';

var db = new Firebase ('bootcamp-questions.firebaseIO.com');

function newUser(email, first, last, pass){
	db.createUser({
			email    : email,
			password : pass,
			firstName: first,
			lastName : last
		}, function(error, userData) {
			if (error) {
			console.log("Error creating user:", error);
		} else {
			console.log("Successfully created user account with uid:", userData.uid);
		}
	});
};

// Capture #submit Button Click
$("#registerSubmit").on("click", function() {

	console.log('clicked the Register button!');

	// Capture User Inputs and store into variables
	var email = $('#registerEmail').val().trim();
	var first = $('#registerFirstName').val().trim();
	var last = $('#registerLastName').val().trim();
	var pass = $('#registerPassword').val().trim();
	var passConfirm = $('#registerPasswordConfirm').val().trim();

	if(pass == passConfirm){
		// clear the question boxes
		$('#registerEmail').val('');
		$('#registerFirstName').val('');
		$('#registerLastName').val('');
		$('#registerPassword').val('');
		$('#registerPasswordConfirm').val('');
		// send the variables through the function that writes them to the firebase
		newUser(email, first, last, pass);
	} else {
		$('#registerPassword').val('')
		$('#registerPasswordConfirm').val('')
		alert('Passwords do not match. Please try again.');
	};

	// Don't refresh the page!
	return false;
});



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

			$('#accountArea').hide();
			$('#loggedIn').show();
			$('#loggedInHeader').text('Welcome back, '+loginEmail);
			$('#modal1Header').html('Login Sucessful');
			$('#modal1Text').html(loginEmail+' has been successfully logged in!');
			$('#modal1').openModal();
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

$("#logOutButton").on("click", function() {

	console.log('clicked the Log Out button!');

	db.unauth();

	$('#accountArea').show();
	$('#loggedIn').hide();
	$('#modal1Header').text('Log Out Sucessful');
	$('#modal1Text').text('User has been successfully logged out.');
	$('#modal1').openModal();

	// Don't refresh the page!
	return false;
});

// Create a callback which logs the current auth state
function authDataCallback(authData) {
  if (authData) {
    console.log("User " + authData.uid + " is logged in with " + authData.provider);
    var loginEmail = authData.password.email;
    userID = authData.uid;

	$('#accountArea').hide();
	$('#loggedIn').show();
	$('#loggedInHeader').text('Welcome back, '+loginEmail);
  } else {
    console.log("User is logged out");

    $('#accountArea').show();
	$('#loggedIn').hide();
  }
}

db.onAuth(authDataCallback);