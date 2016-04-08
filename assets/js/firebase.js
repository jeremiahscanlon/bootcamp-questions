console.log('firebase.js loaded.');

// connection to firebase
var db = new Firebase ('bootcamp-questions.firebaseIO.com');

// function that pushes new trains to the database
function newQuestion(var1, var2, var3){

	db.push({
		questionText: var1,
		name: var2,
		dateTime: var3
	});

};

// Capture #submit Button Click
$("#questionSubmit").on("click", function() {

	console.log('clicked the button!');

	// Capture User Inputs and store into variables
	var question = $('#question').val().trim();
	var questionName = $('#questionName').val().trim();
	var dateTime = moment().format('YYYY-MM-DD HH:mm:ss');
	console.log(question);
	console.log(questionName);
	console.log(dateTime);

	// clear the question boxes
	$('#question').val('');
	$('#questionName').val('');

	// send the variables through the function that writes them to the firebase
	newQuestion(question, questionName, dateTime);

	// Don't refresh the page!
	return false;
});



