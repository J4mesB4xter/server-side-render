async function hydrateIssuePage() {
  let issueElement = document.querySelector('.issue');

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

  let commentsElement = document.querySelector('.comments');
  for (let comment of response.data) {
    let commentElement = document.createElement('div');
    commentElement.classList.add('box');
    commentElement.setAttribute('data-author', comment.author);
    commentElement.classList.add('has-background-primary-light')

    let authorElement = document.createElement('a');
    authorElement.classList.add('author');
    authorElement.setAttribute('href', `/contributors/${comment.author}`);
    

    let bodyElement = document.createElement('p');
    bodyElement.innerText = comment.body;
    

    let readableDate = formatIso(commentElement.getAttribute('data-created-at'));
    
    let createdAtElement = document.createElement('span');
    createdAtElement.innerText = comment.created_at;
    createdAtElement.innerText = ` on: ${readableDate}`
    createdAtElement.classList.add('has-text-grey')

    commentElement.appendChild(authorElement);
    commentElement.appendChild(createdAtElement)
    commentElement.appendChild(bodyElement);
    commentsElement.appendChild(commentElement);
    hydrateAuthor(commentElement);

    
  }
  
}

hydrateIssuePage()



//COMMENT BOX

function postComment(comment) {
  let commentElement = document.createElement('div');
  commentElement.classList.add('box');
  commentElement.setAttribute('data-author', comment.author);
  commentElement.classList.add('has-background-primary-light')

  let authorElement = document.createElement('a');
  authorElement.classList.add('author');
  authorElement.setAttribute('href', `/contributors/${comment.author}`);
  

  let bodyElement = document.createElement('p');
  bodyElement.innerText = 'comment-body';

  let readableDate = formatIso(commentElement.getAttribute('data-created-at'));
  
  let createdAtElement = document.createElement('span');
  createdAtElement.innerText = comment.created_at;
  createdAtElement.innerText = ` on: ${readableDate}`
  createdAtElement.classList.add('has-text-grey')

  commentElement.appendChild(idElement);
  commentElement.appendChild(authorElement);
  commentElement.appendChild(createdAtElement)
  commentElement.appendChild(bodyElement);
  commentsElement.appendChild(commentElement);
  hydrateAuthor(commentElement);
  console.log(commentElement)
}



async function createComment(issueElement) {
  let id = 0;
  let authorId = 0;
  let issueId = 0;
  let comment = {"data": {
    "id" : id,
    "body" : "",
    "author" : authorId,
    "issue" : issueId
    }
  };
  console.log(comment)
  issueId = issueElement.getAttribute('data-id');
  let response = await fetch(`http://localhost:8000/comments.json`)
    .then(R => R.json())
    .catch(E=> null);
  let penult = response.data[-1]
  id = penult.id + 1

  console.log(comment)
}
