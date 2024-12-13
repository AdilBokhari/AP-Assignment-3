import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    
    try {
      const authors = await db.collection('authors').find().toArray();
      res.status(200).json({ authors });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch authors', error: error.message });
    } finally {
      client.close();
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
