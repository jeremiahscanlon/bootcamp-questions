var db = new Firebase ('bootcamp-questions.firebaseIO.com');

db.createUser({
		email    : "bobtony@firebase.com",
		password : "correcthorsebatterystaple"
	}, function(error, userData) {
		if (error) {
		console.log("Error creating user:", error);
	} else {
		console.log("Successfully created user account with uid:", userData.uid);
	}
});