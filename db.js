import { MongoClient } from 'mongodb';

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

export const saveDataToDb = async (collectionName, data) => {
    try {
        await client.connect();
        console.log('Connection to DB was successful');

        const db = client.db('myDatabase');
        const collection = db.collection(collectionName);

        const result = await collection.insertOne(data);
        console.log(`${JSON.stringify(data)} is successfully saved in the DB with id: ${result.insertedId}`);
    } catch (e) {
        console.error('Error:', e);
    } finally {
        await client.close();
    }
};
