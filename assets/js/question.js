// ===============================================================
// This file is for question and reply functionality
// ===============================================================

// make sure the file loads
//console.log('question.js loaded.');

// function that pushes new kwerries to the database
function newQuestion(var1, var2, var3){

	var newkwerry = dbQuestions.push({
		questionText: var1,
		user: var2,
		dateTime: var3
	});

	var newQuestionKey = newkwerry.key();
	console.log(newQuestionKey);

};

// Capture #submit Button Click
$("#questionSubmit").on("click", function() {

	console.log('clicked the button!');

	// Capture User Inputs and store into variables
	var question = $('#question').val().trim();
	var questionAuthor = userID;
	var dateTime = moment().format('YYYY-MM-DD HH:mm');
	console.log(question);
	console.log(questionAuthor);
	console.log(dateTime);

	// clear the question boxes
	$('#question').val('');

	// send the variables through the function that writes them to the firebase
	newQuestion(question, questionAuthor, dateTime);

	// Don't refresh the page!
	return false;
});

dbQuestions.limitToLast(20).on("value", function(snapshot, prechildKey){
	var kwerryResults = snapshot.val();
	var recentKwerries = [];

	$.each( kwerryResults, function(key,value){	
		recentKwerries.push(key);
	});

	for (var i = 0; i < recentKwerries.length; i++) {
		var kwerryID = recentKwerries[i]

		var queryURL = 'https://kwerries.firebaseIO.com/questions/'+ kwerryID +'.json';

	    $.ajax({url: queryURL, method: 'GET'})
	    .done(function(response) {
		    var kwerry = response.questionText;
		    var kwerryDateTime = response.dateTime;
		    var kwerryUserID = response.user;
		    var queryURL2 = 'https://kwerries.firebaseIO.com/users/'+ kwerryUserID +'.json';

		    $.ajax({url: queryURL2, method: 'GET'})
		    .done(function(response) {
				userFirst = response.first;
				userLast = response.last;
				
				$('#kwerryTableRecent').append(	'<tr class="recentKwerry" data-id="'+kwerryID+'">'+
													'<td>'+kwerry+'</td>'+
													'<td>'+userFirst+' '+userLast+'</td>'+
													'<td>'+kwerryDateTime+'</td>'+
													'<td><span class="new badge">4</span></td>'+
												'</tr>'
												);
		    });
	    });
	}
});

	// var queryURL = 'https://kwerries.firebaseIO.com/questions.json';

 //    $.ajax({url: queryURL, method: 'GET'})
 //    .done(function(response) {
 //      console.log(response);
 //    });

