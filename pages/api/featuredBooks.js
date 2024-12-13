import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    const booksCollection = db.collection('books');

    try {
        const books = await booksCollection.find({ rating: { $gte: 4.5 } }).toArray();
        res.status(200).json(books); 
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch books' });
    } finally {
        client.close();
    }
}
