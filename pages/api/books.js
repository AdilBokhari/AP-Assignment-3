import { MongoClient } from 'mongodb';
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    const books = await db.collection('books').find().toArray();
    client.close();
    if (books) {
      res.status(200).json(books);
    } else {
      res.status(404).json({ message: 'Books not found' });
    }
  }
}
