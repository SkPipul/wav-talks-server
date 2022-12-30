const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middle wares
app.use(cors())
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zgj4c3m.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const postCollection = client.db('wavTalksDBUser').collection('posts')

        app.get('/posts', async(req, res) => {
            const query = {}
            const result = await postCollection.find(query).toArray();
            res.send(result);
        })

        app.post('/posts', async(req, res) => {
            const post = req.body;
            const query = {
                image : post.image,
                status : post.status
            };
            const result = await postCollection.insertOne(query);
            res.send(result);
        })
    }
    finally{

    }
}

run().catch(err => console.error(err));

app.get('/', (req, res) => {
    res.send('wav talks server is running')
})

app.listen(port, () => {
    console.log(`wav talks server running on ${port}`);
})