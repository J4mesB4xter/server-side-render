async function hydrateContributorPage() {
  let contributorElement = document.querySelector('.contributor');
  let createdAtElement = contributorElement.querySelector('.created-at');
  createdAtElement.innerText = formatIso(contributorElement.getAttribute('data-created-at'));
}

hydrateContributorPage()