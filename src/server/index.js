require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '../public')))

// your API calls

// example API call
app.get('/rovers/:roverName', async (req, res) => {
    try {
        let info = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${req.params.roverName}/latest_photos?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send(info);
            console.log('info:',info);
    } catch (err) {
        console.log('error:', err);
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))