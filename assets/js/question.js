// ===============================================================
// This file is for question and reply functionality
// ===============================================================

// make sure the file loads
//console.log('question.js loaded.');

// function that pushes new kwerries to the database
function newQuestion(var1, var2, var3, var4){

	var newkwerry = dbQuestions.push({
		questionTitle: var1,
		questionText: var2,
		user: var3,
		dateTime: var4
	});

	var newQuestionKey = newkwerry.key();
	console.log(newQuestionKey);

};

// Capture #submit Button Click
$("#questionSubmit").on("click", function() {

	console.log('clicked the button!');

	// Capture User Inputs and store into variables
	var title = $('#questionTitle').val().trim();
	var question = $('#question').val().trim();
	var questionAuthor = userID;
	var dateTime = moment().format('YYYY-MM-DD HH:mm');
	console.log(question);
	console.log(questionAuthor);
	console.log(dateTime);

	// clear the question boxes
	$('#questionTitle').val('');
	$('#question').val('');

	// send the variables through the function that writes them to the firebase
	newQuestion(title, question, questionAuthor, dateTime);

	// Don't refresh the page!
	return false;
});

dbQuestions.limitToLast(20).on("value", function(snapshot, prechildKey){
	var kwerryResults = snapshot.val();
	var recentKwerries = [];

	$('#kwerryTableRecent').empty();

	$.each( kwerryResults, function(key,value){	
		recentKwerries.push(key);
	});


	for (var i = 0; i < recentKwerries.length; i++) {
		var kwerryID = recentKwerries[i]

		var queryURL = 'https://kwerries.firebaseIO.com/questions/'+ kwerryID +'.json';

	    $.ajax({url: queryURL, method: 'GET'})
	    .done(function(response) {
		    var kwerryTitle = response.questionTitle;
		    var kwerry = response.questionText;
		    var kwerryDateTime = response.dateTime;
		    var kwerryUserID = response.user;
		    var queryURL2 = 'https://kwerries.firebaseIO.com/users/'+ kwerryUserID +'.json';

		    $.ajax({url: queryURL2, method: 'GET'})
		    .done(function(response) {
				userFirst = response.first;
				userLast = response.last;
				
				$('#kwerryTableRecent').append(	'<tr class="recentKwerry" data-firebaseID="'+kwerryID+'">'+
													'<td>'+userFirst+' '+userLast+'</td>'+
													'<td>'+kwerryTitle+'</td>'+
													'<td>'+kwerry+'</td>'+
													'<td>'+kwerryDateTime+'</td>'+
													'<td><span class="new badge">4</span></td>'+
												'</tr>'
												);
		    });
	    });
	}
});

if (document.URL.indexOf("kwerry.html") >= 0 && argument) {
	$('#newKwerry').hide();
    $('#singleKwerry').show();

    kwerryID = argument;
    var queryURL = 'https://kwerries.firebaseIO.com/questions/'+ kwerryID +'.json';

    $.ajax({url: queryURL, method: 'GET'})
    .done(function(response) {
	    kwerryTitle = response.questionTitle;
	    $('#kwerryTitle').text(kwerryTitle);

	    kwerry = response.questionText;
	    kwerryDateTime = response.dateTime;
	    kwerryUserID = response.user;
	    
	    var queryURL2 = 'https://kwerries.firebaseIO.com/users/'+ kwerryUserID +'.json';

	    $.ajax({url: queryURL2, method: 'GET'})
	    .done(function(response) {
			userFirst = response.first;
			userLast = response.last;
			
			$('#singleKwerryTable').append(	'<tr class="singleKwerry" data-id="'+kwerryID+'">'+
												'<td>'+userFirst+' '+userLast+'</td>'+
												'<td>'+kwerry+'</td>'+
												'<td>'+kwerryDateTime+'</td>'+
											'</tr>'
											);
	    });
    });
}

