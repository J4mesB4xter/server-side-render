async function hydrateIssuePage() {
  let issueElement = document.querySelector('.issue');

  let createdAtElement = issueElement.querySelector('.created-at');
  createdAtElement.innerText = formatIso(issueElement.getAttribute('data-created-at'));
  
  let id = issueElement.getAttribute('data-author');
  let response = await fetch(`http://localhost:8000/contributors/${id}.json`)
    .then(R => R.json())
    .catch(E => null);
    console.log(response)
  
  let authorElement = issueElement.querySelector('.author');
  authorElement.innerText = response.data.username;
}

hydrateIssuePage()