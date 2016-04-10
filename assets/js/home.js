// ===============================================================
// This file loads some universal variables and general
// website functionality
// ===============================================================

// make sure the file loads
//console.log('home.js loaded.');

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
var db = new Firebase ('kwerries.firebaseIO.com');

// for creating users
var dbUsers = db.child('users');

// for creating questions
var dbQuestions = db.child('questions');

// create universal variables that will hold the current user info
var userID ='';
var activeEmail = '';
var activeFirst = '';
var activeLast = '';

// get the current page URL
var url = window.location.href
var argument = url.split('?')[1];
console.log(argument);
