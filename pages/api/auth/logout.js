export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        // Clear any cookies, tokens, or session data here.
        res.setHeader('Set-Cookie', 'next-auth.session-token=; Max-Age=0; Path=/; HttpOnly');
        return res.status(200).json({ message: 'Logout successful!' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error logging out.' });
      }
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  