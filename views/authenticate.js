// do a post request
allowLoginAttempt()
function allowLoginAttempt() {
  let button = document.querySelector(".submit-button");
  button.addEventListener("click", authenticateUser);
}

async function authenticateUser() {
  let submission = {
    "username" : document.querySelector('[name="username"]').value,
    "password" : document.querySelector('[name="password"]').value
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
    document.cookie = `authentication-token=${result.data.token}`
    await cacheContributor(submission.username)
    location.reload()
  }
}

// button does nothing
// havent returned token in js; await fetch need editing
//

async function cacheContributor(username) {
  let contributor = await fetch(`http://localhost:8000/contributors.json/?username=${username}`)
    .then(R => R.json())
    .then(json => json.data[0])
    .catch(E=> null);
  let value = JSON.stringify(contributor)
  localStorage.setItem("contributor", value)
}