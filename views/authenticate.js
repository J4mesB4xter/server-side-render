// do a post request
allowLoginAttempt()
function allowLoginAttempt() {
  let button = document.querySelector(".submit-button");
  button.addEventListener("click", authenticateUser);
}

async function authenticateUser() {
  let submission = {
    "username" : document.querySelector('[name="username"]').value,
    "password" :   document.querySelector('[name="password"]').value
  };
  
  let result = await fetch(`http://localhost:8000/contributors/authenticate`, {
    method: "POST",
    body: JSON.stringify(submission),
  })
    .then(R => R.json())
    .catch(E=> null);

  if (result.error) {
    return document.querySelector(".error-message").innerText = "incorrect username/password combination";
  } else {
    localStorage.setItem("authentication-token", result.data.token);
  }
}

// button does nothing
// havent returned token in js; await fetch need editing
//