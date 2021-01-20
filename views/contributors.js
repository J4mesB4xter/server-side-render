async function hydrateContributorsPage() {
  let contributors = document.querySelectorAll('.contributor');
  
  for (let contributor of contributors) {
    let createdAtElement = contributor.querySelector('.created-at');
    createdAtElement.innerText = formatIso(contributor.getAttribute('created-at'));
  }
}
hydrateContributorsPage()