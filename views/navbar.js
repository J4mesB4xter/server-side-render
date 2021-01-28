// function getCookie(cname) {
//   var name = cname + "=";
//   var ca = document.cookie.split(';');
//   for(var i = 0; i < ca.length; i++) {
//     var c = ca[i];
//     while (c.charAt(0) == ' ') {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) == 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return "";
// }

// function checkCookie() {
//   var token = getCookie("authentication-token");
//   if (user != "") {
//     alert("Welcome again " + user);
//   } else {
//     user = prompt("Please enter your name:", "");
//     if (user != "" && user != null) {
//       setCookie("username", user, 365);
//     }
//   }
// }
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) {
     var c = ca[i];
     while (c.charAt(0)==' ') c = c.substring(1);
     if(c.indexOf(name) == 0)
        return c.substring(name.length,c.length);
  }
  return "";
}

function logoutToggle() {
  var token = getCookie("authentication-token");
  if (!token) {
    document.querySelector(".login-button").innerText = "Login";
  }
  else {
    document.querySelector(".login-button").innerText = "Logout";
  }
  return
}
logoutToggle()
  
//   if (token) {
//     let loginButton = document.querySelector('[name="comment-body"]');
//     loginButton.innerText = "Log Out"
//   }
//   return
// }