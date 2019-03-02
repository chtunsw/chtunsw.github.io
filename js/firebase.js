//////////////// firebase setup ////////////////

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCxepxkzpJ4sysUS2LjZhtZ52MaqwWVkd4",
    authDomain: "testproject-52455.firebaseapp.com",
    databaseURL: "https://testproject-52455.firebaseio.com",
    projectId: "testproject-52455",
    storageBucket: "testproject-52455.appspot.com",
    messagingSenderId: "793011152738"
  };
  firebase.initializeApp(config);

//create new database reference "test"
var commentsRef = firebase.database().ref('comments/');

//write comments record to database
function writeData(id, name, img, email, comment, time) {
    commentsRef.push(
        {	
            id:id,
            name:name,
            img:img,
            email:email,
            comment:comment,
            time:time
        }
    )
}

//add comment record to database
function addComment(){
    //init auth2 from gapi
    var auth2 = gapi.auth2.init()
    var profile = auth2.currentUser.get().getBasicProfile()
    //get values from profile
    var id = profile.getId()
    var name = profile.getName()
    var email = profile.getEmail()
    var img = profile.getImageUrl()
    var comment = document.getElementById('commentID').value
    var newDate = new Date()
    var time = newDate.toTimeString()
    writeData(id, name, img, email, comment, time)
}

//add comment element to html page
function addCommentElement(id, name, email, img, comment, time) {
    //get comments list element
    var ele = document.getElementById("comments")
    ele.innerHTML += '<li class="list-group-item">'+'id:'+id+'<br>'+'<img width="20" height="20" src="'+img+'" />'+name+'<br>'+email+'<br>'+'<span style="color:blue">'+comment+'</span>' + '<br>' + time +'</li>'
}

//add onload event listener
window.addEventListener("load", function() { //execute after html loading finished, to get following elements' value
        //add click event listener
        document.getElementById("buttonID").addEventListener('click',addComment)
        //excute for every existing child, and every time a new child added in database
        commentsRef.on('child_added', function (data) {
            addCommentElement(data.val().id, data.val().name, data.val().email, data.val().img, data.val().comment, data.val().time)
        })
    }
)

//////////////// OAuth set up ////////////////

// signed in print
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    //display login info, hide login button
    document.getElementById("login_button").style.display = "none";
    document.getElementById("login_area").style.display = "flex";
    document.getElementById("pic").setAttribute('src',profile.getImageUrl());
    document.getElementById("email").innerHTML = profile.getEmail();
}

//signed out
function signOut() {
var auth2 = gapi.auth2.getAuthInstance();
auth2.signOut().then(function () {
    //display login button, hide login info
    document.getElementById("login_button").style.display = "inline";
    document.getElementById("login_area").style.display = "none";
    console.log('User signed out.');
});
}

//add onload event listener
window.addEventListener("load", function() {
  document.getElementById("logout").addEventListener('click',signOut)
})