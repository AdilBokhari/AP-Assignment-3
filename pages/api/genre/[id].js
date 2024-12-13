import { MongoClient } from 'mongodb';
export default async function handler(req, res) {
    const { id } = req.query;
    if (req.method === 'GET') {
        const client = await MongoClient.connect(process.env.MONGODB_URI);
        const db = client.db();
        try {
            const genre = await db.collection('genres').findOne({ id: id });
            if (!genre) {
                return res.status(404).json({ message: 'Genre not found' });
            }
            const books = await db
                .collection('books')
                .find({ genreId: id })
                .toArray();

            res.status(200).json({
                genre: genre,
                books: books,
            });
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch genre or books', error: error.message });
        } finally {
            client.close();
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
