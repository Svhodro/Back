const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion} = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;
const corsOption ={
    origin:['http://localhost:5173'],
    credentials:true,
    optionsSuccessStatus:200,
  }
  app.use(cors(corsOption));

// middleware

app.use(express.json());
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

const uri = "mongodb+srv://rudrolipi:2WMHO02MtSw8E4kp@test-server.8ltocx3.mongodb.net/?retryWrites=true&w=majority&appName=test-server";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
const serviceCollection = client.db('sporsho').collection('Userdata');

app.get('/insurt',(req,res)=>{
       let data =serviceCollection.insertOne({
        name:"sporsho",
        dateofbirth:"12/3/2003"
       })
       res.send(data)
      //  console.log(data)
})




    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('doctor is running')
})

app.listen(port, () => {
    console.log(`Car Doctor Server is running on port ${port}`)
})