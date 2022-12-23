const express = require('express');
const cors = require('cors');
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion } = require('mongodb');

// middleware
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('donate blood server')
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6hrxcma.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const usersCollection = client.db("donateBlood").collection("users");
        const donarsInfoCollection = client.db("donateBlood").collection("donarsInfo");
        // create user 
        app.post('/users', async (req, res) => {
            const user = req.body
            const result = await usersCollection.insertOne(user)
            res.send(result)
        })
        // add donar info
        app.post('/donars', async (req, res) => {
            const donar = req.body
            const result = await donarsInfoCollection.insertOne(donar)
            res.send(result)
        })
        // show all donars 
        app.get('/donars', async (req, res) => {
            const query = {}
            const options = await donarsInfoCollection.find(query).toArray()
            res.send(options)
        })
        app.get('/donars/:email', async (req, res) => {
            const email = req.params.email
            const query = { email }
            const donar = await donarsInfoCollection.findOne(query)
            res.send(donar)
        })
    }
    catch { }
}
run()
app.listen(port, () => {
    console.log(`donate blood app listenting on port ${port}`);
})