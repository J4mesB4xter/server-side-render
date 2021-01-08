const fetch = require('node-fetch')
const express = require('express')

const app = express()
const port = 3000


app.get('/', (req, res) => {
    res.send('Hello ' + req.query.name)
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
