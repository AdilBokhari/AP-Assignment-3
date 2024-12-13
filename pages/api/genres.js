import { MongoClient } from 'mongodb';
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    const genres = await db.collection('genres').find().toArray();
    client.close();
    if (genres) {
      res.status(200).json(genres);
    } else {
      res.status(404).json({ message: 'Genres not found' });
    }
  }
}
