const fetch = require('node-fetch')
const express = require('express')

const app = express()
const port = 3000

app.set('view engine', 'pug')


app.get('/j', (req, res) => {
    res.render('index', { title: 'NODEmon', message: 'Nodemon is the mon!' })
})

app.get('/issues', async (req, res) => {
    let issues = await getIssues()
    res.send(issues)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

async function getIssues() {

    let response = await fetch('http://localhost:8000/issues.json')
    .then(R => R.json())
    .catch(E => null)
    return response
}
