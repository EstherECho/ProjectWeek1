$(document).ready(() => {
    // Firebase Auth
    console.log('ready')
    $("#submitNew").on('click', () => {
        var userEmail = $("#emailNew").val().trim()
        var userPass = $("#passNew").val().trim()

        // Passwork check and make sure the email is not already in our system
        if (passCheck(userPass)) {
            firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;

            });
            $("#emailNew").text("")
            $("#passNew").text("")
            window.location.href = "../user-index.html"

        } else {
            console.log("Invaild Password")
        }
        // if (user) {
        //   user.updateEmail(userEmail).then(function () {
        //     // Update successful.
        //   }).catch(function (error) {
        //     console.log("nope nope nope")
        //   });

        //   user.updatePassword(userPass).then(function () {
        //     // Update successful.
        //   }).catch(function (error) {
        //     console.log("naaa")
        //   });
        //   console.log("creation success")
        // }
    })

    function passCheck(pass) {
        // Must use a capital letter
        var lowercase = pass.toLowerCase()
        if (lowercase === pass) {
            return false
        } else {
            return true
        }
        // idk something for numbers or symbols
    }
    // Checks to see if the submitted email is in our records
    function emailCheck() {}

    $("#submitLogin").on('click', () => {
        var userEmail = $("#loginEmail").val().trim()
        var userPass = $("#loginPass").val().trim()
        firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

        });

    })

    $("#logOut").on('click', () => {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            console.log("signing OUT")
        }).catch(function (error) {
            // An error happened.
        });
    })

    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;

    var userName = ""
    var userEmail = ""
    var userPhoto = ""
    var userEmailVerified = ""

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log("Ayo we logged in")

            userName = user.displayName;
            userEmail = user.email;
            userPhoto = user.photoURL;
            userEmailVerified = user.emailVerified;

            console.log(userEmail)
        } else {
            console.log("no user sign-in")
        }
    });

})