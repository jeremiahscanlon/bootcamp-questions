// ===============================================================
// This file is for the account creation process and other
// account functionality including log out
// ===============================================================

// make sure the file loads
//console.log('account.js loaded.');

function newAuth(email, first, last, pass){

	db.createUser({
		email    : email,
		password : pass
	}, function(error, userData) {
		if (error) {
			console.log("Error creating user:", error);
			$('#modal1Header').text('Create User Unsucessful');
			$('#modal1Text').text('Creaction of the new user has failed. ' + error);
			$('#modal1').openModal();
		} else {
			console.log("Successfully created user account with uid:", userData.uid);
			userID = userData.uid;
			newUser(userID, email, first, last);
			$('#modalLoginHeader').text('Create User Sucessful. Please Login.');
			$('#modalLogin').openModal();
		}
	});

};

function newUser(userid, email, first, last){

	var userObject = 	'{"' + userid +'":{'+
								'"email":"'+ email +'",'+
								'"first":"'+ first +'",'+
								'"last":"'+ last +'"'+
							'}'+
						'}';
	dbUsers.set(JSON.parse(userObject));

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
		newAuth(email, first, last, pass);
	} else {
		$('#registerPassword').val('')
		$('#registerPasswordConfirm').val('')
		alert('Passwords do not match. Please try again.');
	};

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

