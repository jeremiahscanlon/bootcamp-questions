// ===============================================================
// This file checks to see if there is a client currently 
// logged in or not and changes functionality accordingly
// ===============================================================

// make sure the file loads
console.log('home.js loaded.');

// mobile menu
$(".button-collapse").sideNav();

// open modals
$('.modal-trigger').leanModal();

// Materialize character counter
$('input#input_text, textarea#textarea1').characterCounter();

// function to load a new page
function loadUrl(newLocation){
	window.location = newLocation;
	return false;
}

// create the firebase db connection
var db = new Firebase ('bootcamp-questions.firebaseIO.com');

// creates a universal variable that will hold the current user id
// if anyone is logged in
var userID ='';