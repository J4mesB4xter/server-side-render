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
  console.log(id)
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
    
  let commentsElement = document.querySelector('.comments')
  for (let comment of response.data) {
    let commentElement = document.createElement('div');
    commentElement.classList.add('box')
    commentElement.setAttribute('data-author', comment.author);

    let authorElement = document.createElement('div')
    authorElement.classList.add('author')

    let bodyElement = document.createElement('p');
    bodyElement.innerText = comment.body;


    commentElement.appendChild(authorElement)
    commentElement.appendChild(bodyElement)
    commentsElement.appendChild(commentElement)
    hydrateAuthor(commentElement)

  }
  
}

hydrateIssuePage()