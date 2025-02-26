// pages/api/users/index.js
import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const db = await connectToDatabase();
            const { uid, email, displayName, photoURL } = req.body;
            
            await db.collection('users').updateOne(
                { uid },
                {
                    $set: {
                        email,
                        displayName,
                        photoURL,
                        updatedAt: new Date()
                    }
                },
                { upsert: true }
            );

            res.status(200).json({ message: 'User data saved' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}