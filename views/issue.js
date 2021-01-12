async function hydrateIssuePage() {
  let issueElement = document.querySelector('.issue');

  hydrateAuthor(issueElement)
  hydrateDate(issueElement)

}

function hydrateDate(issueElement) {
  let createdAtElement = issueElement.querySelector('.created-at');
  createdAtElement.innerText = formatIso(issueElement.getAttribute('data-created-at'));
}

async function hydrateAuthor(issueElement) {
  let id = issueElement.getAttribute('data-author');
  let response = await fetch(`http://localhost:8000/contributors/${id}.json`)
    .then(R => R.json())
    .catch(E => null);
  
  let authorElement = issueElement.querySelector('.author');
  authorElement.innerText = response.data.username;
}

hydrateIssuePage()