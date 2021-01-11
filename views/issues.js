async function hydrateIssuesPage() {
  let issues = document.querySelectorAll('.issue');
  for (let issue of issues) {
    let id = issue.getAttribute('data-author');
    let response = await fetch(`http://localhost:8000/contributors/${id}.json`)
      .then(R => R.json())
      .catch(E => null)

    if (!response) {
      continue
    }

    let authorElement = issue.querySelector('.author')
    authorElement.innerText = `created by: ${response.data.username}`
  }
}
hydrateIssuesPage()