const fetch = require('node-fetch')

async function main() {

    let response = await fetch('http://localhost:8000/issues.json')
    .then(R => R.json())
    .catch(E => null)

    console.log(response)
}

main()