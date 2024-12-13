import { MongoClient } from 'mongodb';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'No user found' });
    }
    if (password !== user.password) {
      return res.status(401).json({ message: 'Incorrect password' });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.status(200).json({ token, user });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
