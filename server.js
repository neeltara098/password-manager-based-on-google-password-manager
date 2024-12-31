const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 2008;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'Components'))); 


const url = 'mongodb://127.0.0.1:27017';
const dbName = 'myDatabase'; 

const client = new MongoClient(url);

app.post('/api/users', async (req, res) => {
    try {
        const db = client.db(dbName);
        const collection = db.collection('users');

        const result = await collection.insertOne(req.body);
        console.log(result)
    } catch (error) {
    }
});
app.get('/api/users', async (req, res) => { 
    try { 
        const db = client.db(dbName); 
        const collection = db.collection('users'); 
        const users = await collection.find().toArray(); 
        console.log('Fetched users:', users); 
        res.json(users); 
    } catch (error) { 
        console.error('Error fetching users:', error); 
        res.status(500).json
        ({ message: 'Error fetching users' }); 
    } 
});


app.delete('/api/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const db = client.db(dbName);
    const collection = db.collection('users')
    const result = await collection.deleteOne({ "_id": new ObjectId(userId) });

    if (result.deletedCount === 0) {
      return res.status(404).send('User not found');
    }

    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send('Internal Server Error');
    res.json({message: 'please try again'})
  }
});

app.patch('/api/users/:id', async (req, res) => {
  try {
    const patchId = req.params.id;
    const db = client.db(dbName);
    const collection = db.collection('users');
  
    const modifiedPatch = await collection.updateOne({'_id': new ObjectId(patchId)}, {$set: req.body})
     
    if(modifiedPatch.modifiedCount === 0){
      return res.status(404).send('user not found')
  
    }
    res.json(modifiedPatch)
    
  } catch (error) {
    console.error('error updating user', error)
    res.status(500).send('internal server error')
  }

})



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

