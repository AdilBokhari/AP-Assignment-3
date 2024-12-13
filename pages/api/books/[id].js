import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    const book = await db.collection('books').findOne({ id: id });

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const author = await db.collection('authors').findOne({ id: book.authorId });
    client.close();

    return res.status(200).json({ book, author });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
