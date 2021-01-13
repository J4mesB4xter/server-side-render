async function hydrateIssuePage() {
  let issueElement = document.querySelector('.issue');
  console.log(issueElement)

  hydrateAuthor(issueElement)
  hydrateDate(issueElement)
  hydrateComments(issueElement)

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

async function hydrateComments(issueElement) {
  let id = issueElement.getAttribute('data-id');
  let response = await fetch(`http://localhost:8000/comments.json/?issue=${id}`)
    .then(R => R.json())
    .catch(E => null);
  //assign response data to variable we can call in issue.pug
  for (let comment of response) {
    console.log(comment)
  }
}

hydrateIssuePage()