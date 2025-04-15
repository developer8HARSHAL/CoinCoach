// pages/api/verifyToken.js
import { auth } from '@/lib/firebaseAdmin';

export default async function handler(req, res) {
  const { token } = req.body;

  try {
    const decodedToken = await auth.verifyIdToken(token);
    res.status(200).json({ uid: decodedToken.uid, email: decodedToken.email });
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
}
