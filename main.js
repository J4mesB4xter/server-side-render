const fetch = require('node-fetch')
const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000

app.set('view engine', 'pug')
app.use(express.static('node_modules/bulma/css'))

async function readJson(filename) {
  let text = await fs.promises.readFile(filename);
  let data = JSON.parse(text);
  return(data)
}
// equivalent with promises:
//
// function readJson(filename) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(filename, (err, text) => {
//       if (err) reject('json not found');
//       let data = JSON.parse(text);
//       resolve(data)
//     });
//   })
// }

//ISSUE VIEW ALL
app.get('/issues', async (req, res) => {
  let issues = await getIssues()
  res.render('issues', {issues: issues})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

async function getIssues() {
  let response = await fetch('http://localhost:8000/issues.json')
  .then(R => R.json())
  .catch(E => readJson('./data/issues.json'))
  return response.data
}

//ISSUE VIEW ONE
app.get('/issues/:id', async (req, res) => {
  let id = req.params.id
  if (!id) {
    return res.status(404).end();
  };
  let issue = await getIssue(id)
  res.render('issue', {issue: issue})
})

async function getIssue(id) {
  let response = await fetch(`http://localhost:8000/issues/${id}.json`)
  .then(R => R.json())
  .catch(async (E) => {
    let allIssues = await readJson(`./data/issues.json`);
    return {data: allIssues.data.find(I => I.id == id)}
  })
  return response.data
}

//CONTRIBUTOR VIEW ONE
app.get('/contributors/:id', async (req, res) => {
  let id = req.params.id
  let contributor = await getContributor(id)
  res.render('contributor', {contributor: contributor})
})

async function getContributor(id) {
  let response = await fetch(`http://localhost:8000/contributors/${id}.json`)
  .then(R => R.json())
  .catch(async (E) => {
    let allContributors = await readJson(`./data/contributors.json`);
    return allContributors.find(C => C.id == id)
  })
  return response.data
}
