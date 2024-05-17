const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;
const corsOption ={
  origin:['http://localhost:5173'],
  credentials:true
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

app.get('/insurt',async(req,res)=>{
       let data =await serviceCollection.insertOne({
        name:"sporsho",
        dateofbirth:"12/3/2003"
       })
       res.send(data)
      //  console.log(data)
})
app.get('/Getdata',async(req,res)=>{
  const arraydata = serviceCollection.find();
  const data = await arraydata.toArray();      
  res.send(data);
 //  console.log(data)
})
app.get('/update-opportunity', async (req, res) => {
  try {
       // Get your MongoDB connection
      const { id, ...updatedData } = req.body; // Extract the ID and other updated fields
        // console.log(updatedData)
      // Update the document with the provided ID
      await serviceCollection.updateOne(
          { _id:new ObjectId(id) },
          { $set: updatedData }
      );

      res.status(200).send('Data updated successfully');
  } catch (error) {
      console.error(error);
      res.status(500).send('Error updating data');
  }
});




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