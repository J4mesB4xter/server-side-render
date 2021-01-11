const fetch = require('node-fetch')
const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000

app.set('view engine', 'pug')

async function readJson(filename) {
  let text = await fs.promises.readFile(filename);
  let data = JSON.parse(text);
  return(data)
}
// equivalent with promises:
// function readJson(filename) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(filename, (err, text) => {
//       if (err) reject('json not found');
//       let data = JSON.parse(text);
//       resolve(data)
//     });
//   })
// }

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
