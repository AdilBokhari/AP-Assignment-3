import { MongoClient } from 'mongodb';
export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === 'GET') {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    const author = await db.collection('authors').findOne({ id: id });
    client.close();
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }
    return res.status(200).json({ author });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}