// ===============================================================
// This file checks to see if there is a client currently 
// logged in or not and changes functionality accordingly
// ===============================================================

// make sure the file loads
console.log('auth.js loaded.');

// Create a callback which logs the current auth state
function authDataCallback(authData) {
  if (authData) {

    console.log("User " + authData.uid + " is logged in with " + authData.provider);
    var loginEmail = authData.password.email;
    userID = authData.uid;
    $('#loggedInHeader').text('Welcome back, '+loginEmail);
    $('#accountArea').hide();
    $('#loggedIn').show();

  } else {

    console.log("User is logged out");

  }
}

// watch for changes in authorization and run function 'authDataCallback'
// when there are changes
db.onAuth(authDataCallback);

// Account link buton sends to login or account page depending on auth status

  if (userID) {
    $('#account').on('click',function(){
      loadUrl('account.html');
    });
  } else {
    $('#account').on('click',function(){
      loadUrl('login.html');
    });
  }
