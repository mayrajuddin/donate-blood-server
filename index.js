const express = require('express');
const cors = require('cors');
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000

// middleware

app.get('/', (req, res) => {
    res.send('donate blood server')
})

app.use(cors())
app.use(express.json())

async function run() {
    try {

        // create user 
        app.post('/users', async (req, res) => {
            const user = req.body
        })
    }
    catch { }
}
run()
app.listen(port, () => {
    console.log(`donate blood app listenting on port ${port}`);
})